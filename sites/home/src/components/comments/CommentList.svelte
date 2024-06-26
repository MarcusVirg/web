<script lang="ts">
	import { onMount } from 'svelte'
	import CreateComment from './CreateComment.svelte'
	import CommentItem from './CommentItem.svelte'
	import type { CommentAggregate as Comment } from '../../functions/utils/events'

	export let blogId: string
	export let comments: Promise<Comment[]> = Promise.resolve([])

	onMount(() => (comments = fetchComments(blogId)))

	async function fetchComments(blogId: string): Promise<Comment[]> {
		const res = await fetch(`/.netlify/functions/get-comments?blogId=${blogId}`)

		if (!res.ok) {
			let error
			try {
				error = await res.json()
			} catch (err) {
				error = res.statusText
			}

			throw new Error(error)
		}
		return await res.json()
	}

	async function addNewComment(event: CustomEvent<Comment>): Promise<Comment[]> {
		const currentComments = await comments
		comments = Promise.resolve([event.detail, ...currentComments])
		return comments
	}
</script>

<div class="mt-16">
	<h2 class="text-2xl mb-4">Comments</h2>
	{#await comments}
		{#each Array(4) as _}
			<div class="mt-8 space-y-4">
				<div class="animate-pulse bg-zinc-700 h-6 w-24 rounded" />
				<div class="animate-pulse bg-zinc-700 h-4 w-48 rounded" />
				<div class="animate-pulse bg-zinc-700 h-4 w-64 rounded" />
				<div class="animate-pulse bg-zinc-700 h-4 w-56 rounded" />
			</div>
		{/each}
	{:then comments}
		<CreateComment {blogId} on:newComment={addNewComment} />
		<div class="mt-4 flex flex-col divide-y">
			{#each comments as comment}
				<CommentItem {comment} />
			{/each}
		</div>
	{:catch error}
		<p class="text-red-600 dark:text-red-400">{error.message}</p>
	{/await}
</div>
