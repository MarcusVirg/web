import type { HandlerEvent } from '@netlify/functions'
import factory from './utils/factory'
import type { Store } from './utils/store'
import { DeleteComment } from './utils/commands'
import { EventType, type CommentDeleted, type Event } from './utils/events'

async function run(e: HandlerEvent, redis: Store): Promise<CommentDeleted> {
	const command = DeleteComment.parse(JSON.parse(e.body || '{}'))

	const event: CommentDeleted = {
		blogId: command.blogId,
		commentId: command.commentId,
		deletedAt: new Date().toISOString()
	}

	const eventCtx: Event = {
		type: EventType.COMMENT_DELETED,
		payload: event
	}

	await redis.lpush(`blog:${command.blogId}:comments`, eventCtx)

	return event
}

export const handler = factory(run)
