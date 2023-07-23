import type { HandlerEvent, HandlerContext } from '@netlify/functions'
import factory from './utils/factory'
import storage from './utils/store'
import { EditComment } from './utils/commands'
import { EventType, type CommentEdited, type Event } from './utils/events'

async function run(e: HandlerEvent, _ctx: HandlerContext): Promise<CommentEdited> {
	const store = storage.connect()

	const command = EditComment.parse(JSON.parse(e.body || '{}'))

	const event: CommentEdited = {
		blogId: command.blogId,
		commentId: command.commentId,
		comment: command.comment,
		edited_at: new Date().toISOString()
	}

	const eventCtx: Event = {
		type: EventType.COMMENT_EDITED,
		payload: event
	}

	await store.lpush(`blog:${command.blogId}:comments`, eventCtx)

	return event
}

const errorMessage = 'Cannot edit comments at this time, please try again later.'
export const handler = factory(run, errorMessage)
