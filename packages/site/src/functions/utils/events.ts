export type CommentCreated = {
	blogId: string
	commentId: number
	author: string
	comment: string
	createdAt: string
}

// export type CommentEdited = {
// 	blogId: string
// 	commentId: number
// 	comment: string
// 	editedAt: string
// }

export type CommentDeleted = {
	blogId: string
	commentId: number
	deletedAt: string
}

export enum EventType {
	COMMENT_CREATED = 'COMMENT_CREATED',
	COMMENT_DELETED = 'COMMENT_DELETED'
}

export type Event =
	| {
			type: EventType.COMMENT_CREATED
			payload: CommentCreated
	  }
	| {
			type: EventType.COMMENT_DELETED
			payload: CommentDeleted
	  }

export type CommentAggregate = {
	blogId: string
	commentId: number
	author: string
	comment: string
	timestamp: string
}
