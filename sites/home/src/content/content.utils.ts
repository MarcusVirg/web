import type { CollectionEntry } from 'astro:content'

export function onlyFinalPosts(post: CollectionEntry<'blog'>) {
	return import.meta.env.PROD ? !post.data.isDraft : true
}
