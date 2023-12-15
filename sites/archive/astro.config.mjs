import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
	site: 'https://archive.marcusv.me',
	integrations: [
		tailwind({ applyBaseStyles: false }),
		starlight({
			title: 'The Archive',
			social: {
				github: 'https://github.com/MarcusVirg',
				linkedin: 'https://www.linkedin.com/in/marcusvirginia',
				mastodon: 'https://mastodon.social/@marcusvirginia'
			},
			sidebar: [
				{
					label: 'Patterns',
					autogenerate: {
						directory: 'patterns'
					}
				},
				{
					label: 'Process',
					autogenerate: {
						directory: 'process'
					}
				},
				{
					label: 'Code Snippets',
					autogenerate: {
						directory: 'code'
					}
				}
			],
			expressiveCode: {
				styleOverrides: {
					borderRadius: '0.5rem'
				}
			},
			customCss: ['./src/global.css'],
			favicon: '/favicon.ico',
			head: [
				{
					tag: 'script',
					attrs: {
						src: 'https://plausible.io/js/script.js',
						'data-domain': 'archive.marcusv.me',
						defer: true
					}
				}
			]
		})
	]
})
