import { z } from 'zod'

export const AddComment = z.object({
	blogId: z.string(),
	author: z.string(),
	comment: z.string()
})

export type AddComment = z.infer<typeof AddComment>

export const EditComment = z.object({
	blogId: z.string(),
	commentId: z.number(),
	comment: z.string()
})

export type EditComment = z.infer<typeof EditComment>

export const GetComments = z.object({
	blogId: z.string()
})

export type GetComments = z.infer<typeof GetComments>
