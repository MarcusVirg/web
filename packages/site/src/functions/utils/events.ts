export type CommentCreated = {
	blogId: string
	commentId: number
	author: string
	comment: string
	created_at: string
}

export type CommentEdited = {
	blogId: string
	commentId: number
	comment: string
	edited_at: string
}

export enum EventType {
	COMMENT_CREATED = 'COMMENT_CREATED',
	COMMENT_EDITED = 'COMMENT_EDITED'
}

export type Event =
	| {
			type: EventType.COMMENT_CREATED
			payload: CommentCreated
	  }
	| {
			type: EventType.COMMENT_EDITED
			payload: CommentEdited
	  }
