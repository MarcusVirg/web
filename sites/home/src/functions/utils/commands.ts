import { z } from 'zod'

export const AddComment = z.object({
	blogId: z.string(),
	author: z.string().trim().min(1).max(50),
	comment: z.string().trim().min(1).max(3000)
})

export type AddComment = z.infer<typeof AddComment>

export const GetComments = z.object({
	blogId: z.string()
})

export type GetComments = z.infer<typeof GetComments>

// export const EditComment = z.object({
// 	blogId: z.string(),
// 	commentId: z.number(),
// 	comment: z.string().trim().min(1)
// })

// export type EditComment = z.infer<typeof EditComment>

export const DeleteComment = z.object({
	blogId: z.string(),
	commentId: z.number()
})

export type DeleteComment = z.infer<typeof DeleteComment>
