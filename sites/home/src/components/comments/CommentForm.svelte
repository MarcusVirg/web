<script lang="ts">
	import TextArea from './TextArea.svelte'
	import TextField from './TextField.svelte'
	import type { CommentAggregate } from '../../functions/utils/events'

	type Props = {
		comment: Pick<CommentAggregate, 'author' | 'comment'>
		onCommentSubmission: () => void
	}
	let { comment = $bindable(), onCommentSubmission }: Props = $props()
	let formErrors: Record<string, string> = $state({})

	function onsubmit(e: SubmitEvent) {
		e.preventDefault()
		formErrors = {}
		const errors: Record<string, string> = {}
		if (!comment.author) errors.author = 'Author is required'
		if (comment.author.length > 50)
			errors.author = 'Your name must be less than 50 characters'
		if (!comment.comment) errors.comment = 'Comment is required'
		if (comment.comment.length > 3000)
			errors.comment = 'Your comment must be less than 3000 characters'

		if (Object.keys(errors).length) {
			formErrors = errors
			return
		}
		onCommentSubmission()
	}
</script>

<form {onsubmit} class="space-y-4">
	<TextField
		name="author"
		label="Name"
		bind:value={comment.author}
		error={formErrors.author}
	/>
	<TextArea
		name="comment"
		label="Enter your comment"
		bind:value={comment.comment}
		error={formErrors.comment}
	/>
	<button
		type="submit"
		class="inline-flex justify-center items-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-brand-blue font-semibold text-slate-900 hover:bg-zinc-700 active:bg-zinc-800 active:text-slate-100/70 dark:bg-brand-blue dark:hover:bg-brand-blue dark:active:bg-brand-violet dark:active:text-slate-100/70 focus:ring focus:ring-brand-violet focus:ring-offset-2 dark:ring-offset-zinc-900"
	>
		Add Comment
	</button>
</form>
