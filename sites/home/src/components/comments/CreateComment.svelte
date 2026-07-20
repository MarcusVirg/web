<script lang="ts">
	import CommentForm from './CommentForm.svelte'
	import type { CommentAggregate as Comment } from '../../comments/types'

	type Props = {
		blogId: string
		onNewComment: (comment: Comment) => void
	}
	let { blogId, onNewComment }: Props = $props()

	const INITIAL_COMMENT: Pick<Comment, 'blogId' | 'author' | 'comment'> = {
		blogId,
		author: localStorage.getItem('author') || '',
		comment: ''
	}
	let comment = $state(INITIAL_COMMENT)
	let error: string | null = $state(null)

	async function addComment() {
		const res = await fetch('/api/comments', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
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

		onNewComment(await res.json())
		localStorage.setItem('author', comment.author)
		comment = INITIAL_COMMENT
	}
</script>

<div>
	<CommentForm bind:comment onCommentSubmission={addComment} />
	{#if error}
		<p class="text-red-400 text-sm font-semibold mt-2">{error}</p>
	{/if}
</div>
