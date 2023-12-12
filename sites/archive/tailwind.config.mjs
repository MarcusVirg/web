import starlightPlugin from '@astrojs/starlight-tailwind'

// Generated color palettes
const accent = { 200: '#c2c5e9', 600: '#605cbf', 900: '#2d2c57', 950: '#20203b' }
const gray = {
	100: '#f5f6f8',
	200: '#eceef2',
	300: '#c0c2c7',
	400: '#888b96',
	500: '#545861',
	700: '#353841',
	800: '#24272f',
	900: '#17181c'
}

// const accent2 = { 200: '#83d6f2', 600: '#007893', 900: '#003947', 950: '#002934' }

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'brand-blue': '#5A95D8',
				'brand-violet': '#5651B3',
				'brand-dark-purple': '#2D1623',
				accent,
				gray
			}
		}
	},
	plugins: [starlightPlugin()]
}
