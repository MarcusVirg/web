<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import TextArea from './TextArea.svelte'
	import TextField from './TextField.svelte'
	import type { CommentAggregate } from '../../functions/utils/aggregates'

	const dispatch = createEventDispatcher()

	export let comment: Pick<CommentAggregate, 'author' | 'comment'>
	let formErrors: Record<string, string> = {}

	function onSubmit() {
		formErrors = {}
		const errors: Record<string, string> = {}
		if (!comment.author) errors.author = 'Author is required'
		if (!comment.comment) errors.comment = 'Comment is required'

		if (Object.keys(errors).length) {
			formErrors = errors
			return
		}
		dispatch('submit')
	}
</script>

<form on:submit|preventDefault={onSubmit} class="space-y-4">
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
		class="inline-flex justify-center items-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-brand-blue font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-brand-blue dark:hover:bg-brand-blue dark:active:bg-brand-violet dark:active:text-zinc-100/70 focus:ring focus:ring-brand-violet focus:ring-offset-2 dark:ring-offset-zinc-900"
	>
		Publish Comment
	</button>
</form>
