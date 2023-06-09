import type { HandlerEvent, HandlerContext } from '@netlify/functions'
import factory from './utils/factory'
import storage from './utils/store'
import { GetComments } from './utils/commands'
import { type Event, EventType } from './utils/events'
import type { CommentAggregate } from './utils/aggregates'

async function run(
	e: HandlerEvent,
	_ctx: HandlerContext
): Promise<CommentAggregate[]> {
	const store = storage.connect()

	const command = GetComments.parse(e.queryStringParameters)

	const commentEvents = await store.lrange<Event>(
		`blog:${command.blogId}:comments`,
		0,
		-1
	)

	const commentAggregates = commentEvents.reduce(
		(acc: Record<number, CommentAggregate>, event: Event) => {
			switch (event.type) {
				case EventType.COMMENT_CREATED:
					acc[event.payload.commentId] = {
						blogId: event.payload.blogId,
						commentId: event.payload.commentId,
						author: event.payload.author,
						comment: event.payload.comment,
						isEdited: false,
						timestamp: event.payload.created_at
					}
					break
				case EventType.COMMENT_EDITED:
					acc[event.payload.commentId] = {
						...acc[event.payload.commentId],
						comment: event.payload.comment,
						isEdited: true,
						timestamp: event.payload.edited_at
					}
					break
			}
			return acc
		},
		{}
	)

	console.log(commentAggregates)

	return Object.values(commentAggregates)
}

const errorMessage = 'Cannot add comments at this time, please try again later.'
export const handler = factory(run, errorMessage)
