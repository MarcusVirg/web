---
title: 'Redis Streams With Elixir'
date: '2023-07-25T00:00'
excerpt: "Consuming with a Redis Stream using Elixir & Redix."
categories: [Software, Full Stack, Redis, Elixir]
isDraft: true
---

# Redis Streams With Elixir: A Guide to Event Sourcing

In the modern age of web applications, real-time data processing has become a crucial need to solve real-world problems while also delivering a great user experience.

As user interactions and events generate an ever-increasing flow of data, developers seek efficient solutions to handle, process, and deliver this stream of information in a timely manner. Combining the powerful concurrency model of Elixir with a battle-tested key value database, Redis, makes a great solution for a real-time event-sourcing system.

In this post, we will take a look at what it looks like to use Redis Streams in an Elixir application using websockets. Afterwards you should have a good starting point to build your own real-time system whether it be a chat application, monitoring system, or anything other system that could benefit from event-sourcing.

> I built the comment system for this blog using Redis Stream backed event-sourcing to record new posts.

## What are Redis Streams?

[Redis Streams](https://redis.io/docs/data-types/streams/) are a powerful data structure within Redis that allow you to store, manage, and process streams of data while keeping the elements in chronological order. The Redis docs give some good examples of use cases:

- Event sourcing (e.g., tracking user actions, clicks, etc.)
- Sensor monitoring (e.g., readings from devices in the field)
- Notifications (e.g., storing a record of each user's notifications in a separate stream)

If you are familiar with Kafka or RabbitMQ, Redis Streams are very similar to those projects but Redis Streams has some benefits which we will get into later. For now will be focusing mainly on a simple implementation of the first example of tracking user actions in our app.

It is important to know that streams are append-only data structures, meaning you cannot edit a record after you have written it, however this gives streams some nice performance properties. Adding an entry to a stream is O(1), constant time. Accessing any single entry in the stream is O(n), where n is the length of the ID. When you append an entry to the stream, Redis can generate an ID for you using milliseconds epoch and an internal sequence so these IDs are generally short and fixed length. That O(n) lookup is usually just constant time because of this. These performance properties are owed by the underlying implementation's data structure, [Radix trees](https://en.wikipedia.org/wiki/Radix_tree).

Each entry in a stream consists of field value pairs similar to a dictionary or a different Redis data structure, `Hashes`. These field value pairs are space separated in the commands like so:

```redis
XADD account:1:log * name Han Solo age 35
```

This command adds an entry `name: Han Solo, age: 35` to the stream `account:1:log`. The `*` in this command tells the Redis server to auto generate the ID. You can pass a value here to set an ID explicitly.

Let's look at a few more of the basic commands:

| Command | Description |
| ------- | ----------- |
| XADD | Adds a new entry to a stream |
| XREAD | Reads one or many entries, starting at a given entry ID |
| XRANGE | Reads one or many entries between two given entry IDs |
| XLEN | Returns the number of entries in a specific stream |

There are many other commands that you can find [here](https://redis.io/commands/?group=stream). Most other commands are related to consumer groups. Consumer groups are a mechanism for processing a single stream in parallel. So you can have consumer 1 process messages 1-100 as consumer 2 is processing messages 101-200 at the same time. We won't cover consumer groups in this post but Redis has [great documentation](https://redis.io/docs/data-types/streams/#consumer-groups) on them if you are curious.

## Data Model

Now that we have a better idea of what Redis Streams are, let's go over what our data model will look like for our simple application.

I think our application will stay simple and scale well if we decide to have one stream per account in our system. This is a good idea if most of your entities are underneath an account and cross-account queries or operations are not common. We will handle one cross-account operation in this post to show how it can be done.

Here is how it might look in Redis:

| Key | Value | Field Keys | Field Values |
| --- | ----- | ---------- | ------------ |
| account:{id}:log | STREAM | event_type | STRING |
| | | event_payload | STRING |

Each account would get it's own stream, this basically partitions events in our system per account which makes account log scans faster down the road.

> An alternative would be to put all events in one stream and use an account id is part of the ID to keep lookups fast.

Now you might be asking "great but how do we create a unique ID per account?". There are many options here. You could use UUIDs and generate them in code, you could use a distributed counter service that just gets the next integer in a sequence, or you could use another feature of Redis (sequences) which is what we will do here.

Sequences in Redis are super simple because Redis handles atomic operations for us. To create a sequence, we just enter the command: `INCR <key_for_sequence>`. If that key doesn't exist yet, Redis will add it and set the value to 0 initially.

With this setup this is what our new data model looks like:

| Key | Value | Field Keys | Field Values |
| --- | ----- | ---------- | ------------ |
| account_id | SEQUENCE | | |
| account:{id}:log | STREAM | event_type | STRING |
| | | event_payload | STRING |

For now I named the key `account_id` but you can use whatever key name you think is best.

Let's add one more requirement to our system the finalize our data model. We do not want two accounts in our system to have the same email address. So we need to be able to check uniqueness across all accounts in our system (cross-account operation). To do this, we can use the [reservation pattern](https://freecontent.manning.com/wp-content/uploads/reservation-pattern.pdf) which will allow us to provide uniqueness in an event-sourcing system. The idea is that we reserve a value in a command that is sent in and if we have successfully reserved that value, we can then write the event in the account log.

With that requirement in mind, we can build a new, final data model:

| Key | Value | Field Keys | Field Values |
| --- | ----- | ---------- | ------------ |
| account_id | SEQUENCE | | |
| email:{email_address} | <account_id> | | |
| account:{id}:log | STREAM | event_type | STRING |
| | | event_payload | STRING |

We can just create a lookup that ties a single email address to a single account id. We know we can `reserve` that email if the lookup doesn't return an account id.

Don't worry if this data model is confusing right now, it will make more sense when we get into the implementation.

## Elixir Implementation

Now that we have a plan and a path forward for how our data will be stored, let's continue with the implementation.

### Setup

First make sure erlang and elixir are installed on your machine. If they are not, pause here and take a look at [this guide](https://elixir-lang.org/install.html).

You will know Elixir is installed correctly if this command works: `elixir --version`. Next you will want to install hex and rebar:

```sh
mix local.hex --force && mix local.rebar --force
```

After that has finished, create a new Elixir project:

```sh
mix new redis_streams --sup
```

You should now have a new elixir project in a folder called `redis_streams` with directories `lib` and `test` as well as a few config files inside.

Let's open `mix.exs` and add a few dependencies for this project:

- Bandit: Pure Elixir http server
- dotenvy: Read in a .env to use in our runtime config
- plug: Wrapper over bandit so we can use plug apps
- redix: Redis client library for elixir
- typed_struct: Typed struct definitions
- websock_adapter: Used in plug apps to upgrade connections to websockets

To install these dependencies you can copy this list into your `defp deps` function in `mix.exs`:

```elixir
defp deps do
  [
    {:bandit, "~> 1.0-pre"},
    {:dotenvy, "~> 0.8.0"},
    {:plug, "~> 1.14"},
    {:redix, "~> 1.1"},
    {:typed_struct, "~> 0.3.0"},
    {:websock_adapter, "~> 0.5"}
  ]
end
```

Save that file and then run `mix deps.get` to pull down these dependencies.

One final step for setup is to move `application.ex` up one level into `lib` and then delete any folders inside of `lib` as well as `redis_streams.ex` since we won't be using it.

### Redis

The easiest way to get started with Redis is to use [Docker](https://redis.io/docs/getting-started/install-stack/docker/):

```sh
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```

This command will start a docker container with a redis server on port `6379`.

Alternatively you can create a hosted Redis somewhere with a service like [Upstash](https://upstash.com/).

### Config

Now that we have our application setup, let's quickly create a runtime config to pull in our redis endpoint.

First create a new folder at the top level called `config`. Inside this folder create a new file called `runtime.exs`.

Copy this code into that file:

```elixir
import Config
import Dotenvy

source!([".env", System.get_env()])

config :redis, redis_endpoint: env!("REDIS_ENDPOINT", :string)
```

This code imports `Config` and `Dotenvy` which pulls in the `source` function and `config` macro. We are passing the path of a `.env` file to source and telling Elixir to put a new config `:redis` that points to a keyword list. So we expect there to be a variable called `REDIS_ENDPOINT` in our .env file.

Let's create that `.env` file now at the top level. Add that variable in the new file:

```sh
REDIS_ENDPOINT=redis://localhost:6379
```

For now I am pointing at a local Redis instance but you can change this to point at a hosted version of Redis somewhere.

> Reminder: If you do not have a local Redis running, the easiest way to get one up and running is with Docker: [Redis Stack with Docker](https://redis.io/docs/getting-started/install-stack/docker/).

## Application

Now that we have the setup done, we can now start creating our application. In `lib/application.ex` we are starting a Supervisor with children processes currently so we should add some. There are two processes we want to start; one to initialize our HTTP server and the other to connect to our Redis instance.

For the HTTP server, we can pass `Bandit` as our first child:

```elixir
{Bandit, plug: RedisStreams.Http}
```

`Bandit` takes one argument called `Plug` that will point at our Plug app. We haven't created this module yet but for now we can call it `RedisStreams.Http`.

For the store we will implement our own supervisor so we can pass a new module as the second child:

```elixir
{RedisStreams.Store, Application.get_env(:redis)}
```

We want to pass this new module our `:redis` config we defined earlier so it can get the connection string.

Your `Application` module should look something like:

```elixir
defmodule RedisStreams.Application do
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      {Bandit, plug: RedisStreams.Http},
      {RedisStreams.Store, Application.get_env(:redis)}
    ]

    opts = [strategy: :one_for_one, name: RedisStreams.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
```

## Caveats

### Redis and Memory

Redis is first and foremost an in-memory store with disk-based backups. This means that using Redis in this way will keep all of your user data in-memory at all times. This is great for the lookups but can be a problem for the account log streams since they grow continuously with enough users and events you may eventually run out of memory. If your user base is capped and your events are small this is probably not going to be a problem.

If you do think this will be an issue, it might be worth looking into a solution that builds on top of the base open-source redis to solve the issue of large event logs. [Redis on Flash](https://redis.com/redis-enterprise/technology/redis-on-flash/) might be a good option if you want Redis enterprise support anyways. Another option I would recommend is [Upstash Streams](https://upstash.com/blog/redis-streams-beyond-memory).

You could also implement something yourself and instead of storing the event payload inside the stream, you could store a location on another file system or database like a MongoDB uuid or an Amazon S3 bucket.
