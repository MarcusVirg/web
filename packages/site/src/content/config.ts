import { defineCollection, type CollectionEntry, z } from 'astro:content'

const blog = defineCollection({
	schema: z.object({
		title: z.string(),
		date: z.string().transform((str) => new Date(str)),
		excerpt: z.string(),
		categories: z.array(z.string()),
		isDraft: z.boolean()
	})
})

const experience = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			company: z.string(),
			logo: image()
				.refine((img) => img.format === 'png')
				.optional(),
			startDate: z.string().transform((str) => new Date(str)),
			endDate: z
				.string()
				.transform((str) => new Date(str))
				.optional(),
			isDraft: z.boolean()
		})
})

const projects = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			logo: image()
				.refine((img) => img.format === 'png')
				.optional(),
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

export function onlyFinalPosts(post: CollectionEntry<'blog'>) {
	return import.meta.env.PROD ? !post.data.isDraft : true
}
