<script lang="ts">
	import type { CollectionEntry } from 'astro:content'

	export let slug: string
	export let post: CollectionEntry<'blog'>['data']
	export let showDate = false
</script>

<article class="group relative flex flex-col">
	{#if showDate}
		<div class="flex items-center mb-3 space-x-3.5 relative z-10">
			<div aria-hidden="true" class="h-4 w-0.5 rounded-full bg-zinc-500" />
			<time class="text-sm text-zinc-500" datetime={post.date.toISOString()}>
				{post.date.toLocaleDateString('en-US', {
					month: 'long',
					day: 'numeric',
					year: 'numeric'
				})}
			</time>
		</div>
	{/if}
	<h2 class="font-semibold tracking-wider text-zinc-100 mb-3">
		<div
			class="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-800/50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl"
		/>
		<a href={`/blog/${slug}`} rel="prefetch" data-astro-prefetch>
			<span
				class="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"
			/>
			<span class="relative z-10">{post.title}</span>
		</a>
	</h2>
	<p class="relative z-10 text-sm text-zinc-400">{post.excerpt}</p>
	<div
		aria-hidden="true"
		class="relative z-10 mt-4 flex items-center space-x-1 text-sm text-brand-blue font-semibold"
	>
		<span>Read on</span>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="ionicon h-4 w-4"
			viewBox="0 0 512 512"
		>
			<title>Chevron Forward</title>
			<path
				fill="currentColor"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="48"
				d="M184 112l144 144-144 144"
			/>
		</svg>
	</div>
</article>
