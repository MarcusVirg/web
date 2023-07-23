import type { HandlerEvent, HandlerContext } from '@netlify/functions'
import factory from './utils/factory'
import storage from './utils/store'
import { AddComment } from './utils/commands'
import { EventType, type CommentCreated, type Event } from './utils/events'

async function run(e: HandlerEvent, _ctx: HandlerContext): Promise<CommentCreated> {
	const store = storage.connect()

	const command = AddComment.parse(JSON.parse(e.body || '{}'))

	const event: CommentCreated = {
		blogId: command.blogId,
		commentId: await store.incr('commentId'),
		author: command.author,
		comment: command.comment,
		created_at: new Date().toISOString()
	}

	const eventCtx: Event = {
		type: EventType.COMMENT_CREATED,
		payload: event
	}

	// TODO: Use Redis Streams when Upstash supports it
	await store.lpush(`blog:${command.blogId}:comments`, eventCtx)

	return event
}

const errorMessage = 'Cannot add comments at this time, please try again later.'
export const handler = factory(run, errorMessage)
