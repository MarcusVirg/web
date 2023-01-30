import { z, defineCollection } from 'astro:content'

const blog = defineCollection({
	schema: z.object({
		title: z.string(),
		date: z.string().transform((str) => new Date(str)),
		excerpt: z.string(),
		tags: z.array(z.string()),
		isDraft: z.boolean()
	})
})

const experience = defineCollection({
	schema: z.object({
		title: z.string(),
		tags: z.array(z.string()),
		isDraft: z.boolean()
	})
})

const projects = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
		isDraft: z.boolean()
	})
})

export const collections = {
	blog,
	experience,
	projects
}
