---
title: 'Test Markdown'
date: '2022-04-24T00:00'
excerpt: "Just a post to test markdown features with Astro"
categories: [Software, Markdown, Test]
isDraft: true
---

# Test - Heading 1

## Heading 2

A normal paragraph text

---

- List Item 1
- List Item 2

```ts
export type Props = {
  name: string
}

function main() {
  startMyAwesomeProgram() {
    console.log('Starting...')
  }
}
```

```sh
npm run dev
```

Here is some `inline code`.

Here is a [link to some other website](https://www.resplice.com).

What does a photo look like?

![Hi Estudio Render](/blog-assets/test-img-1.jpg)

Same photo with caption:

<figure>
  <img
    src="/blog-assets/test-img-1.jpg"
    alt="Hi Estudio Render"
  >
  <figcaption>
    Photo by <a href="https://unsplash.com/es/@hiestudio?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">HI! ESTUDIO</a> on <a href="https://unsplash.com/photos/Yv9S5LhfobA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  </figcaption>
</figure>
