---
title: 'Deployment Strategy for Web Apps'
date: '2023-09-04T00:00'
excerpt: "A guide to a straightforward deployment strategy for web apps using GitHub Actions and Vercel."
categories: [Software, Full Stack, Data]
isDraft: true
---

# Deployment Strategy for Web Apps

So you've finally built the thing but now you might be thinking to yourself, "how do I deploy this thing"? That question gets even more complicated when you throw in all the requirements of modern continuous integration and delivery. Complexity grows even more when coordination across people or full teams needs to be managed in your deployment strategy. In this post, I will outline one of my favorite deployment strategies that you can setup right away and still have it scale to multiple team members or even across a few teams.

## CI/CD

Continuous Integration (CI) & Continuous Delivery/Deployment (CD) are terms that are thrown around a lot in the DevOps world. They describe the cycle of writing code, integrating that code into the codebase, usually with automation, and then deploying that code to an environment.
