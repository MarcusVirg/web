---
title: 'Deployment Strategy for Web Apps'
date: '2023-09-04T00:00'
excerpt: "A guide to a straightforward deployment strategy for web apps using GitHub Actions and Vercel."
categories: [Software, Full Stack, Deployment]
isDraft: true
---

# Deployment Strategy for Web Apps

So you've finally built the thing but now you might be thinking to yourself, "How do I deploy this thing"? That question gets even more complicated when you throw in all the requirements of modern continuous integration and delivery. Complexity grows even more when coordination across people or full teams needs to be managed in your deployment strategy. In this post, I will outline one of my favorite deployment strategies that you can set up right away and still have it scale to multiple team members or even across a few teams.

## CI/CD

Continuous integration (CI) & continuous delivery/deployment (CD) are terms that are thrown around a lot when talking about deploying software. They describe the cycle of writing code, integrating that code into the codebase, usually with automation, and then deploying that code to an environment. Ideally, you want to make small, continuous improvements to your software and get those changes out to your users often and as fast as possible. CI/CD is a crucial system needed to meet this deployment goal. So what exactly is this system and how do we build it?

### Continuous Integration

Continuous integration, or CI, is the practice of integrating any and all code changes into the trunk or main branch of your code repository and then automating the testing, linting, style checks, and new build of those code changes. With this system in place, you can automatically detect errors and other issues that arise from your code changes much earlier in the development process. If you merge your changes often you also reduce the amount of code conflict that arises and this usually results in smaller pull requests and higher quality code reviews.

### Continuous Delivery

Continuous delivery, or CD, is the practice of automating infrastructure provisioning, packaging, and deployment of an application to a testing environment, usually after it goes through a CI layer. DevOps and DevEx teams usually gate this CD process with some requirements like code coverage must be over 80% or the Docker container must have no critical security warnings from a container scan for example. At the end of this process, the team should be able to deploy the software changes to production quickly and easily. Ideally this is done with a single button click after some manual testing and QA of the change in the test environment.

### Continuous Deployment

There is a second term for CD called continuous deployment. I like to think of continuous deployment as the more mature version of continuous delivery because this process automates the release and deployment of the changes into the production environment and into user's hands. If this is implemented correctly, a code change can be merged and then go live within a few minutes, allowing you to gather feedback and iterate quickly. Implementing continuous deployment does require more upfront investment, especially in your unit and end-to-end test suites, to ensure you do not accidentally push breaking changes to production.

The difference between continuous delivery and continuous deployment will be much more clear after our implementation. Atlassian has a great diagram showing the difference and how they relate to CI:

![CI-CD-diff](./images/ci-cd-1.png)

While you can have CI without CD, having CD without CI is generally not recommended as it is dangerous to release an untested application into production.

## Implementation

Now that we have a better idea of what some of these terms mean, let's go through an implementation of a CI/CD pipeline. This guide will not go through an implementation of continuous deployment as it can be implemented fairly easily after continuous integration and continuous delivery and is usually reserved for applications that have a robust test suite.

This guide will use an example front-end application and show you how to create a CI/CD process that deploys to [Vercel](https://vercel.com/home).

### Tools

There are many CI/CD tools out there that provide a platform to help integrate and implement these changes. Some examples include:

- GitLab
- GitHub Actions
- Jenkins
- CircleCI
- TravisCI
- and many more
