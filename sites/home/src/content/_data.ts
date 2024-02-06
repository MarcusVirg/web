type NavigationItem = {
	name: string
	href: string
}
export const navigationItems: NavigationItem[] = [
	{
		name: 'Home',
		href: '/'
	},
	{
		name: 'About',
		href: '/about'
	},
	{
		name: 'Blog',
		href: '/blog'
	},
	{
		name: 'Projects',
		href: '/projects'
	},
	{
		name: 'Uses',
		href: '/uses'
	}
]

type Social = {
	name: string
	icon: string
	url: string
}
export const socialsData: Social[] = [
	{
		name: 'mastodon',
		icon: 'logo-mastodon',
		url: 'https://mastodon.social/@marcusvirginia'
	},
	{
		name: 'github',
		icon: 'logo-github',
		url: 'https://github.com/MarcusVirg'
	},
	{
		name: 'linkedin',
		icon: 'logo-linkedin',
		url: 'https://www.linkedin.com/in/marcusvirginia/'
	},
	{
		name: 'twitch',
		icon: 'logo-twitch',
		url: 'https://www.twitch.tv/marcuscodez'
	},
	{
		name: 'instagram',
		icon: 'logo-instagram',
		url: 'https://www.instagram.com/marcusjvirginia/'
	},
	{
		name: 'rss',
		icon: 'logo-rss',
		url: '/rss.xml'
	}
]

export const resumeLink =
	'https://drive.google.com/file/d/1iiUyz2p4GFHv5AlyY88BhFLQIZeAgsDJ/view?usp=sharing'

type UsesItem = {
	title: string
	description: string
	link?: string
}
export const usesData: [string, UsesItem[]][] = [
	[
		'Workstation',
		[
			{
				title: 'Custom Built PC running Windows 11',
				description: 'Intel i9-10850K, 32GB RAM, 1TB NVMe SSD, 2TB HDD, RTX 3070 Ti'
			},
			{
				title: 'LG UltraGear QHD 34-inch Curved Monitor',
				description:
					"A really solid HDR monitor with a 144Hz refresh rate, running at 3440x1440 resolution. Its great for gaming and productivity with all this screen real estate. I think its a really good option if you want an HDR monitor that won't break the bank.",
				link: 'https://www.amazon.com/gp/product/B08DWD38VX'
			},
			{
				title: 'Fully Jarvis Bamboo Standing Desk',
				description:
					'An adjustable standing desk that is really easy to assemble and use. I love the bamboo top and the fact that it has a built in cable management system. I would recommend getting the extra power grommets and using velcro to mount a power strip underneath the desk.',
				link: 'https://www.fully.com/standing-desks/jarvis/jarvis-adjustable-height-desk-bamboo.html'
			},
			{
				title: 'Secretlab Titan 2020',
				description:
					'This chair is incredible. Very comfortable even after sitting in it for hours. The adjustability is great and the build quality is top notch.',
				link: 'https://secretlab.co/collections/titan-series#titan_2020-stealth'
			},
			{
				title: 'MacBook Pro M1 Max 14" 2021, 32GB RAM',
				description:
					"My main mobile workstation for work and personal use. The M1 Max is an amazing chip, it runs most of my workflows without an issues and the battery life is great, usually lasting a full day or more. Also the keyboard is much better than the old 2015 MacBook I was using. Fun Fact: I bought this on a whim during a trip to NYC, after my 2015 MacBook's keyboard gave up on me."
			}
		]
	],
	[
		'Design',
		[
			{
				title: 'Figma',
				description:
					'This is the best collaborative design tool hands down. I use it for all my design work whether I am making app screens, twitch backgrounds, or resumes. Seriously why are you using anything else?',
				link: 'https://www.figma.com/'
			}
		]
	],
	[
		'Productivity',
		[
			{
				title: 'Notion',
				description:
					'My go to for note taking, task management, and project management. I like that notion can be as simple or as complex as you would like it to be. It has had some issues with slow page loads and authentication in the past but they continue to improve the performance and reliability of the product. I highly recommend it to help you run your personal life or business.',
				link: 'https://www.notion.so/'
			},
			{
				title: 'YNAB',
				description:
					'You Need a Budget is a pretty great tool for doing budgeting and general financial management. I have only been using it for a few months but I like the approach they take to budgeting. At first it took a little while to get used too but they have great resoures to learn how to budget with it.',
				link: 'https://www.youneedabudget.com/'
			}
		]
	],
	[
		'Dev',
		[
			{
				title: 'Visual Studio Code',
				description:
					'Like many others, I switched to VS Code after trying a few different text editors during my college years. The plugins and community around the editor allows it to support any language really. I have learned enough keyboard shortcuts to make myself fairly productive in it, maybe not to the level of those Vim wizards but close enough. I am currently using the One Dark Pro theme.',
				link: 'https://code.visualstudio.com'
			},
			{
				title: 'WSL2',
				description:
					'Because my main workstation is running Windows, doing development there tends to be a bit painful... This is where WSL2 comes in. It basically gives me a full Linux environment that has its own file system but also has access to the Windows file system. I install all of my development tools and code in the WSL2 file system. The VS Code WSL extension works very well and allows me to use zsh in the integrated terminal. This is the only way I would recommend developing in a Windows environment.',
				link: 'https://learn.microsoft.com/en-us/windows/wsl/about#what-is-wsl-2'
			},
			{
				title: 'Dev Containers',
				description:
					"For anything other than node based projects, I use VS Code development containers as dev environments. These are great because you can create your dev environment inside a container with all the required depedencies of your project's toolchain. You can use VS Code to build and then exec into these containers, as well install extensions that you specify in your container configuration.",
				link: 'https://code.visualstudio.com/docs/devcontainers/containers'
			}
		]
	],
	[
		'Preferred Stack',
		[
			{
				title: 'Svelte (Base Framework & Apps)',
				description:
					"This is a great reactive framework for building web apps or even static websites using a component model. The framework is really simple and small since it doesn't ship a huge runtime with it. It also has a bunch of nice built-ins such as svelte stores and spring animations.",
				link: 'https://svelte.dev/'
			},
			{
				title: 'Astro (Static Sites)',
				description:
					'Astro is my go-to for building content-focused static sites, including this website. It feels like a super-powered templating engine that lets you use svelte components and render them to HTML during build or allow svelte to run on the client with their Islands Architecture. I like that everything defaults to shipping no javascript. I would really like to see the Astro community grow.',
				link: 'https://astro.build/'
			},
			{
				title: 'Tailwind CSS (Styling)',
				description:
					'Tailwind with a component based framework like svelte is like having super powers. I know there are some strong opinions towards Tailwind but I have found it really does reduce styling friction in my projects, not having to context switch between files and having view logic, styling, and structure all in one file is amazing. It would be hard for me to go back to writing vanilla CSS.',
				link: 'https://tailwindcss.com/'
			},
			{
				title: 'Tauri (Native Mobile and Desktop Apps)',
				description:
					'I have yet to use Tauri to build a production application but I have played around with it and it seems like a really nice solution for writing mobile and desktop native applications. I can write apps in web technologies like Svelte and compile them to native platforms using their native web views and runtime. It also lets you write Rust code to interact with the platform you are running on.',
				link: 'https://tauri.app/'
			},
			{
				title: 'Deno & Oak (APIs)',
				description:
					'Deno is a great runtime especially since it has TS support built in. It feels like a next generation of Node as it stays closer to the native web platform and has nice security features built-in. The tooling is also a little better when developing deno applications. Many of the edge runtimes support running Deno apps. Oak is also a simple http library to use as everything is just an entry in a stack of middlewares.',
				link: 'https://deno.land/'
			},
			{
				title: 'Rust (High performance or critical system components)',
				description:
					'I would use Rust across the stack to write any system components that need to be high performance or need to be correct. You could use Rust compiled to WASM to build a high performance search index in a web app. It is also great for heavy CPU bound tasks on the backend, calling into Rust from the Deno runtime to process an image for example.',
				link: 'https://www.rust-lang.org/'
			},
			{
				title: 'PostgreSQL (Database)',
				description:
					'This is my go to database engine for almost all products, unless I have a specific need to go NoSQL (even then I could just use the jsonb type). Even a single instance of Postgres can scale pretty well and if you do need to really scale up, there are projects working on distributed postgres like Citus. The Postgis extension is amazing for doing complex geo spatial queries as well.',
				link: 'https://www.postgresql.org/'
			}
		]
	]
]
