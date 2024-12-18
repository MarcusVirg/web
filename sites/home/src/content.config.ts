import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		date: z.date(),
		excerpt: z.string(),
		categories: z.array(z.string()),
		isDraft: z.boolean()
	})
})

const experience = defineCollection({
	loader: glob({ base: './src/content/experience', pattern: '**/*.md' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			company: z.string(),
			logo: image().optional(),
			startDate: z.date(),
			endDate: z.date().optional(),
			isDraft: z.boolean()
		})
})

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			logo: image(),
			website: z.string().optional(),
			github: z.string().optional(),
			categories: z.array(z.string()),
			sortOrder: z.number(),
			isDraft: z.boolean()
		})
})

export const collections = {
	blog,
	experience,
	projects
}
