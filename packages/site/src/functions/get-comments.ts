import type { HandlerEvent } from '@netlify/functions'
import factory from './utils/factory'
import type { Store } from './utils/store'
import { GetComments } from './utils/commands'
import { type Event, type CommentAggregate, EventType } from './utils/events'

async function run(e: HandlerEvent, redis: Store): Promise<CommentAggregate[]> {
	const command = GetComments.parse(e.queryStringParameters)
	console.log(command)

	const commentEvents = await redis.lrange<Event>(
		`blog:${command.blogId}:comments`,
		0,
		-1
	)

	console.log(commentEvents)

	const commentAggregates = commentEvents.reduce(
		(acc: Map<number, CommentAggregate>, event: Event) => {
			switch (event.type) {
				case EventType.COMMENT_CREATED:
					acc.set(event.payload.commentId, {
						blogId: event.payload.blogId,
						commentId: event.payload.commentId,
						author: event.payload.author,
						comment: event.payload.comment,
						timestamp: event.payload.createdAt
					})
					break
				case EventType.COMMENT_DELETED:
					acc.delete(event.payload.commentId)
					break
			}
			return acc
		},
		new Map()
	)

	return [...commentAggregates.values()]
}

export const handler = factory(run)
