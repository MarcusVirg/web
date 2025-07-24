import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import tailwindcss from '@tailwindcss/vite'
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
	integrations: [sitemap(), svelte(), icon()],
	vite: {
		plugins: [tailwindcss()]
	},
	markdown: {
		remarkPlugins: [readingTime],
		shikiConfig: {
			theme: 'one-dark-pro'
		}
	},
	prefetch: true
})
