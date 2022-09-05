<script context="module" lang="ts">
  import { dev } from '$app/env'
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ params }: any) {
    type Module = () => Promise<Record<string, any>>
    const modules = import.meta.glob('$lib/blog/content/*.md')
    const matchingModule = Object.entries(modules).reduce<Module | null>(
      (m, [path, module]) => {
        if (m) return m

        const match = path.match(/([a-zA-Z0-9\-]+)\.(md|svelte\.md)/g)
        if (!match) return m

        const [pathSlug] = match[0].split('.')
        if (pathSlug === params.slug) return module

        return m
      },
      null
    )

    if (!matchingModule)
      return {
        status: 404
      }

    const post = await matchingModule()

    if (!dev && post.metadata.draft)
      return {
        status: 404
      }

    return {
      props: {
        post
      }
    }
  }
</script>

<script lang="ts">
  import type { Post } from '$types/blog'
  export let post: Post
  $: PostComponent = post.default
</script>

<svelte:head>
  <title>{post.metadata.title}</title>
  <meta property="og:site_name" content={post.metadata.title} />
  <meta property="og:title" content={post.metadata.title} />

  <meta name="description" content={post.metadata.excerpt} />
  <meta property="og:description" content={post.metadata.excerpt} />

  <meta name="keywords" content={post.metadata.tags.join(', ')} />
</svelte:head>

<main>
  <article>
    <svelte:component this={PostComponent} />
  </article>
</main>
