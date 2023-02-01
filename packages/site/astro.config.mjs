import { defineConfig } from 'astro/config'
import image from '@astrojs/image'
import prefetch from '@astrojs/prefetch'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
	site: 'https://marcusv.me',
	integrations: [
		image({
			serviceEntryPoint: '@astrojs/image/sharp'
		}),
		prefetch(),
		sitemap(),
		tailwind()
	],
	markdown: {
		shikiConfig: {
			theme: 'one-dark-pro'
		}
	}
})
