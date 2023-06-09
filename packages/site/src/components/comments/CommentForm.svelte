<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import TextArea from './TextArea.svelte'
	import TextField from './TextField.svelte'
	import type { CommentAggregate } from '../../functions/utils/aggregates'

	const dispatch = createEventDispatcher()

	export let comment: Pick<CommentAggregate, 'author' | 'comment'>

	function onSubmit() {
		dispatch('submit')
	}
</script>

<form on:submit|preventDefault={onSubmit}>
	<TextField name="author" label="Name" bind:value={comment.author} />
	<TextArea name="comment" label="Enter your comment" bind:value={comment.comment} />
	<button
		type="submit"
		class="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70 ml-4 flex-none"
	>
		Publish Comment
	</button>
</form>
