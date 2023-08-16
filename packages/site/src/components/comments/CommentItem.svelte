<script lang="ts">
	import type { CommentAggregate as Comment } from '../../functions/utils/events'

	export let comment: Comment
</script>

<div class="border-zinc-800 py-4 space-y-2">
	<h3 class="font-semibold text-lg">{comment.author}</h3>
	<time class="text-sm text-slate-400">
		{new Date(comment.timestamp).toLocaleString(navigator.language, {
			dateStyle: 'long',
			timeStyle: 'short'
		})}
	</time>
	<p class="whitespace-pre-line">{comment.comment}</p>
</div>
