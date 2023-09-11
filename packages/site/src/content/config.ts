import { defineCollection, type CollectionEntry } from 'astro:content'
import { blogSchema, experienceSchema, projectSchema } from './_schemas'

const blog = defineCollection({
	schema: blogSchema
})

const experience = defineCollection({
	schema: experienceSchema
})

const projects = defineCollection({
	schema: projectSchema
})

export const collections = {
	blog,
	experience,
	projects
}

export function onlyFinalPosts(post: CollectionEntry<'blog'>) {
	return import.meta.env.PROD ? !post.data.isDraft : true
}
