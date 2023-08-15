import type { HandlerEvent } from '@netlify/functions'
import factory from './utils/factory'
import type { Store } from './utils/store'
import { AddComment } from './utils/commands'
import {
	EventType,
	type Event,
	type CommentCreated,
	type CommentAggregate
} from './utils/events'

async function run(e: HandlerEvent, redis: Store): Promise<CommentAggregate> {
	const command = AddComment.parse(JSON.parse(e.body || '{}'))

	const event: CommentCreated = {
		blogId: command.blogId,
		commentId: await redis.incr('commentId'),
		author: command.author,
		comment: command.comment,
		createdAt: new Date().toISOString()
	}

	const eventCtx: Event = {
		type: EventType.COMMENT_CREATED,
		payload: event
	}

	// TODO: Use Redis Streams when @upstash/redis supports it
	await redis.lpush(`blog:${command.blogId}:comments`, eventCtx)

	return {
		blogId: event.blogId,
		commentId: event.commentId,
		author: event.author,
		comment: event.comment,
		timestamp: event.createdAt
	}
}

export const handler = factory(run, {
	featureFlag: 'add-comment',
	rateLimit: {
		requests: 2,
		duration: '1 m'
	}
})
