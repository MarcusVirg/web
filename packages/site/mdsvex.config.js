import slug from 'rehype-slug'

/** @type {import('mdsvex').MdsvexOptions} */
const config = {
  extensions: ['.svelte.md', '.md'],
  rehypePlugins: [slug]
}

export default config
