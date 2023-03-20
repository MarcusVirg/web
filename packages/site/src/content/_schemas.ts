import { z } from 'astro:content'

export const blogSchema = z.object({
	title: z.string(),
	date: z.string().transform((str) => new Date(str)),
	excerpt: z.string(),
	categories: z.array(z.string()),
	isDraft: z.boolean()
})

export type Post = z.infer<typeof blogSchema>

export const experienceSchema = z.object({
	title: z.string(),
	company: z.string(),
	logo: z.string().optional(), // Must be a .png file
	startDate: z.string().transform((str) => new Date(str)),
	endDate: z
		.string()
		.transform((str) => new Date(str))
		.optional(),
	isDraft: z.boolean()
})

export type Experience = z.infer<typeof experienceSchema>

export const projectSchema = z.object({
	title: z.string(),
	description: z.string(),
	logo: z.string().optional(), // Must be a .png file
	website: z.string().optional(),
	github: z.string().optional(),
	categories: z.array(z.string()),
	sortOrder: z.number(),
	isDraft: z.boolean()
})

export type Project = z.infer<typeof projectSchema>
