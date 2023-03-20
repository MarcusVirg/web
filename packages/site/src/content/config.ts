import { defineCollection } from 'astro:content'
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
