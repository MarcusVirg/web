<script lang="ts">
	import type { CommentAggregate as Comment } from '../../functions/utils/aggregates'

	export let comment: Comment
</script>

<div class="mt-8 space-y-2">
	<h3 class="font-semibold text-lg">{comment.author}</h3>
	<p>{comment.comment}</p>
</div>
