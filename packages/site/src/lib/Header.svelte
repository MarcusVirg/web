<script lang="ts">
  import Button from './common/Button.svelte'
  import Link from './common/Link.svelte'
</script>

<header class="bg-brand-light-blue rounded-b-2xl">
  <div class="max-w-4xl m-auto p-8 flex justify-between flex-wrap">
    <div class="flex space-x-4 items-end">
      <a
        class="text-3xl font-semibold tracking-wider mr-4 hover:underline hover:underline-offset-4 decoration-2 text-brand-white hover:decoration-brand-cream"
        href="/"
      >
        Marcus Virginia
      </a>
      <Link class="text-lg" href="/blog">Blog</Link>
      <Link class="text-lg" href="/resume">Resume</Link>
      <Link class="text-lg" href="/uses">Uses</Link>
      <Button on:click={() => window.open('https://store.marcusv.me')}>
        Convenience Store
      </Button>
    </div>
    <div class="invisible md:visible">Icons</div>
  </div>
</header>
