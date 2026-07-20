import { z } from 'zod'

export const AddComment = z.object({
	blogId: z.string().trim().min(1).max(200),
	author: z.string().trim().min(1).max(50),
	comment: z.string().trim().min(1).max(3000)
})

export const GetComments = z.object({
	blogId: z.string().trim().min(1).max(200)
})

export const DeleteComment = z.object({
	blogId: z.string().trim().min(1).max(200),
	commentId: z.coerce.number().int().positive()
})
