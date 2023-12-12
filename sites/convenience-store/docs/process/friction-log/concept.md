---
sidebar_position: 1
---

# Intro

`Product Friction` is a concept that can be used to understand how your users are interacting with your product
and better represent the pain points inside the product flows.
Identifying and analyzing these friction points is very important when looking to improve engagement and adoption.

One way to identify this friction is through user testing using one particular using testing method called `friction logs`.

Many of these ideas are pulled from this [awesome post](https://www.trychameleon.com/blog/friction-logs) by Chameleon.

## Product or Process Friction

What do we mean when we say friction? Well there are really two different types of friction.

### Motivational

**Motivational Friction** is when the user can easily complete tasks and actions but they have no real motivation to finish the flow.
This happens when the user has a general feeling that a product does not provide them value.

Generally the cause of this type of friction is that the user had some expectation and the product did not live up to you.
Maybe it didn't do what they expected or as quickly as they expected, or the end result/reward was not what they intended.

### Ability

**Ability Friction** is a type of friction that actually prevents a user from continuing, whether through confusion or through non-functional steps or components.

Some examples:

- They can't continue because a dropdown won't actually select their option.
- A button click isn't registering.
- An unknown server error occurred preventing them from completing the task.

### Positive Friction

Not all friction is negative however. Some friction can be intentional and when used correctly will lead to greater user investment into your product or process.
You can tie friction to a positive emotion like a feeling of accomplishment.
Because it may be almost impossible to remove all friction in your product, your goal instead should be to turn any inevitable friction into positive friction.

Some examples:

- Rewarding the friction endured in the authentication or sign up process with the option to personalize their experience or show extra features
- Setting up keybindings in an app causes some friction but the user knows it will allow them to be more efficient and safe time later on.

## Friction Log

What is a friction log?

A friction log is traditional a UX exercise that captures the end-to-end experience using a real example in a simple way.

This is often used when evaluating product onboarding or other user flows.
As someone goes through a flow, they will write down each step they take and also how they felt while doing it.
These thoughts can be as brief or as in depth as you would like them to be.
That being said, writing friction logs should not generate friction themselves so keep it simple when writing them or asking someone to write one.
Using templates is a really easy way to remove friction from writing them so you can be focused on content only.

So far we have only been talking about friction in terms of users using a product.
This concept can also be applied to DX (Developer Experience) to great affect.
Your engineers and developers can also be customers of a process or product.
A team in charge of creating good DX, can use friction logs as a good way to evaluate some internal process or tool in the company in a more pragmatic way.

Some examples of tasks done by engineers:

- Setting up a CI/CD pipeline to deploy some software.
- Spinning up a resource like a database or managed software.
- Initializing a repository with some code generation built in.

### Why use them?

The one obvious benefit is to create a seamless and rewarding experience for users of your product or process.

There are many other benefits however. Doing this exercise can improve collaboration between teams and creates an environment
where more experimental ideas can flow between teams that will lead to a better overall experience and product.

Another useful benefit is that it creates greater empathy for the users of your product.
It takes you away from being the "builder" of the project, where user input is limited or non-existent, and puts you right into a users shoes.
If you do friction logs yourself, you can better understand what kind of emotions the user experiences.

One final benefit is the idea generation that can come from doing this exercise.
As you are writing down your steps, you should think about experiments you can run or changes you can make that might make the experience better.

### When should you use them?

Friction logs can be done as often as you would like.

Adding a new feature or introducing a UI refresh is a great time to do this exercise.
Sometimes UI refreshes can introduce new pain points and actually regress user flows.

Another indicator could be when many user complain about a specific flow or process. You can use friction logs as an easy way to gather feedback.

Lastly, it is a good exercise to do when you see a change of staff happen. It will help your new staff member get familiar with the products
and will allow them to immediately contribute some ideas and improvements to your core flows.
I think the best people to do this exercise are those who are unfamiliar with the UI or process as they are more likely to give unbiased feedback.

## How to write one

1. Pick the flow, process, or set of tasks that you would like your user to do.

2. Include some nice-to-have metadata about the tasks like who did the exercise, what was the date, what was their environment (OS or Browser),
   and the task set or flow being used.

3. Create a simple key or legend so you can map a task to an emotion. I recommend using colors to map things;
   Green => Easy. Makes sense!<br />
   Yellow => Had to work a little bit to get past it, wasn't great.<br />
   Red => Would have given up if I didn't work here.<br />
   You can also just use easy text markers or emojis as a map. See the [example log](./example.md) for ideas.

4. Narrate your experience and write down steps taken. For each step, assign it to a color in your key and talk about what went through your mind.
   This experience can just be recorded with a document, an audio recording, or a full video recording ideally with screen sharing.
   The idea is to create some live commentary about the task you are doing and your thoughts on it. You can use whatever medium you feel is necessary to provide that.

## Sharing the log

These logs provide no value if no one looks at them. After you have finished this exercise share it with your teammates and other teams at your company.
Often the best place to share them is where your DX organization lives so they can add tasks to their necessary backlogs
and start looking at your experience and discoveries.

Choosing the format of these logs is really up to you.
I provide this [template] in a markdown format as it gives you come nice structured and styled text
while also being interoperable between content platforms. (GitHub, Blog Sites, static site generators, etc)

You could also use Google Docs, Notion, Microsoft OneNote, etc. to write and distribute these logs.

Now go on be free and starting logging that friction.
