<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import CommentForm from './CommentForm.svelte'

	const dispatch = createEventDispatcher()

	export let blogId: string
	const INITIAL_COMMENT = {
		blogId,
		author: localStorage.getItem('author') || '',
		comment: ''
	}
	let comment = INITIAL_COMMENT
	let error: string | null = null

	async function addComment() {
		const res = await fetch('/.netlify/functions/add-comment', {
			method: 'POST',
			body: JSON.stringify(comment)
		})
		if (!res.ok) {
			try {
				error = await res.text()
			} catch (err) {
				error = res.statusText
			}

			return
		}

		dispatch('newComment', await res.json())

		localStorage.setItem('author', comment.author)
		comment = INITIAL_COMMENT
	}
</script>

<div>
	<CommentForm bind:comment on:submit={addComment} />
	{#if error}
		<p class="text-red-400 text-sm font-semibold mt-2">{error}</p>
	{/if}
</div>
