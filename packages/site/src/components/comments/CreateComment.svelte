<script lang="ts">
	import CommentForm from './CommentForm.svelte'

	export let blogId: string
	let comment = {
		blogId,
		author: '',
		comment: ''
	}
	let error: string | null = null

	async function addComment() {
		const res = await fetch('http://localhost:4000/.netlify/functions/add-comment', {
			method: 'POST',
			body: JSON.stringify(comment)
		})
		if (!res.ok) error = res.statusText
		return await res.json()
	}
</script>

<div>
	<CommentForm bind:comment on:submit={addComment} />
	{#if error}
		<p class="text-red-600 text-sm font-semibold">{error}</p>
	{/if}
</div>
