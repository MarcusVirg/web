---
title: 'Key Pair Party With Elixir & JS'
date: '2022-01-16T00:00'
excerpt: 'Learn how to generate a key pair in Elixir and import the public key into JS.'
categories: [Elixir, JavaScript, Crypto]
isDraft: false
---

# Key Pair Party With Elixir & JS

Encrypting data in-transit is a must have for security in any modern web application. These days most of it is handled for us with our hosting providers managing TLS certificates. However, most of the time the TLS terminates before it gets to your application server, likely at some load balancer managed by the hosting provider. So you are now putting your trust in the hosting provider to protect your application data. If they have a breach and some bad actor is able to read packets after TLS termination, they could read all your app data in plaintext before it hits your server.

For this reason alone, it might be enough to convince you to add an encryption layer at the application level, underneath TLS. There are many ways we can do this but in this post I will give an example of how to generate a key pair on the server, import the public key into JS using the `WebCrypto` API and securely send data to the server.
