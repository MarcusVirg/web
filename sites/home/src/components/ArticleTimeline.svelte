<script lang="ts">
	import type { CollectionEntry } from 'astro:content'
	import Article from './Article.svelte'

	type Props = {
		posts: CollectionEntry<'blog'>[]
	}
	let { posts }: Props = $props()
	let selectedCategory = 'All Categories'

	const categories = $derived([
		'All Categories',
		...new Set(posts.map((post) => post.data.categories).flat())
	])
	const filteredPosts = $derived(
		selectedCategory === 'All Categories'
			? posts
			: posts.filter((post) => post.data.categories.includes(selectedCategory))
	)
</script>

<section>
	<select
		class="bg-zinc-800/90 text-slate-200 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-violet focus:outline-none"
		onchange={(e) => (selectedCategory = e.currentTarget.value)}
	>
		{#each categories as category}
			<option value={category}>{category}</option>
		{/each}
	</select>

	<div class="mt-8">
		{#each filteredPosts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime()) as post}
			<div class="flex flex-nowrap">
				<div class="relative">
					<div
						class="absolute w-4 h-4 bg-zinc-800 rounded-full -left-[7px] top-8"
					></div>
					<div class="w-[3px] h-full bg-zinc-800"></div>
				</div>
				<div class="py-8 px-4 pl-12 flex-1">
					<Article id={post.id} post={post.data} showDate />
				</div>
			</div>
		{/each}
	</div>
</section>
