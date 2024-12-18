import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { onlyFinalPosts } from '../content/content.utils'

export async function GET() {
	const blogCollection = await getCollection('blog', onlyFinalPosts)
	return rss({
		title: 'Marcus Virginia | Blog',
		description:
			"Marcus's personal blog about software engineering and other things.",
		site: 'https://www.marcusv.me',
		items: blogCollection.map((post) => ({
			title: post.data.title,
			pubDate: post.data.date,
			description: post.data.excerpt,
			link: `/blog/${post.slug}/`
		})),
		customData: `<language>en-us</language>`,
		stylesheet: '/rss-styles.xsl'
	})
}
