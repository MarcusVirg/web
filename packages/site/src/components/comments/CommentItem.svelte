<script lang="ts">
	import type { CommentAggregate as Comment } from '../../functions/utils/aggregates'

	export let comment: Comment
</script>

<div>
	<p>{comment.author}</p>
	<p>{comment.comment}</p>
</div>
