import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import svelte from '@astrojs/svelte'
import icon from 'astro-icon'
import getReadingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'

function readingTime() {
	return function (tree, file) {
		const textOnPage = toString(tree)
		const readingTime = getReadingTime(textOnPage)
		file.data.astro.frontmatter.readingTime = readingTime.text
	}
}

// https://astro.build/config
export default defineConfig({
	site: 'https://marcusv.me',
	integrations: [sitemap(), tailwind(), svelte(), icon()],
	markdown: {
		remarkPlugins: [readingTime],
		shikiConfig: {
			theme: 'one-dark-pro'
		}
	},
	prefetch: true
})
