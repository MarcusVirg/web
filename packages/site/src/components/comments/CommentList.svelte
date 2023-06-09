<script lang="ts">
	import CreateComment from './CreateComment.svelte'
	import CommentItem from './CommentItem.svelte'
	import type { CommentAggregate as Comment } from '../../functions/utils/aggregates'

	export let blogId: string

	async function fetchComments(blogId: string): Promise<Comment[]> {
		const res = await fetch(
			`http://localhost:4000/.netlify/functions/get-comments?blogId=${blogId}`
		)
		if (!res.ok) throw new Error(res.statusText)
		return await res.json()
	}
</script>

<div>
	{#await fetchComments(blogId)}
		<p>Loading...</p>
	{:then comments}
		<CreateComment {blogId} />
		{#each comments as comment}
			<CommentItem {comment} />
		{/each}
	{:catch error}
		<p>{error.message}</p>
	{/await}
</div>
