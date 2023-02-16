/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'brand-blue': '#5A95D8',
				'brand-violet': '#5651B3',
				'brand-dark-purple': '#2D1623'
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
}
