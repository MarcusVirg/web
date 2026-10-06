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
				title: 'Google Stitch',
				description:
					'I use Google Stitch for initial design exploration and trying out interactions for the products I build. It helps me explore ideas before moving into more detailed mockups.',
				link: 'https://stitch.withgoogle.com/'
			},
			{
				title: 'Figma',
				description:
					'Figma is still my go-to for high fidelity mockups. Once I have a direction, I use it to work through the details and refine the design.',
				link: 'https://www.figma.com/'
			}
		]
	],
	[
		'Productivity',
		[
			{
				title: 'Codex',
				description:
					'I use Codex alongside Obsidian to organize my life and manage tasks. It has become a regular part of how I keep track of what I need to do.',
				link: 'https://openai.com/codex/'
			},
			{
				title: 'Obsidian',
				description:
					"Obsidian is where I keep my personal wiki. Its agent support isn't great, but I like its features and plugins for organizing and maintaining my notes in a predictable, deterministic way.",
				link: 'https://obsidian.md/'
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
				title: 'Zed',
				description:
					"I recently switched to Zed and like it much better. The plugin ecosystem isn't growing as quickly as the VSCode ecosystem, but it is still a great everyday editor.",
				link: 'https://zed.dev/'
			},
			{
				title: 'WSL2',
				description:
					'Because my main workstation is running Windows, doing development there tends to be a bit painful... This is where WSL2 comes in. It basically gives me a full Linux environment that has its own file system but also has access to the Windows file system. I install all of my development tools and code in the WSL2 file system. This is the only way I would recommend developing in a Windows environment.'
			},
			{
				title: 'Codex',
				description:
					'Codex is my daily driver for building software. I use both the CLI and the app as part of my everyday development workflow.',
				link: 'https://openai.com/codex/'
			}
		]
	],
	[
		'Preferred Stack',
		[
			{
				title: 'React (Base Framework & Apps)',
				description:
					'I prefer React for building web apps. The ecosystem is better for what I build, and AI models know React much better, which makes it a natural fit for how I work.',
				link: 'https://react.dev/'
			},
			{
				title: 'Astro (Static Sites)',
				description:
					'Astro is my go-to for building content-focused static sites, including this website. It feels like a super-powered templating engine, with an Islands Architecture that lets me add interactive components where I need them. I like that everything defaults to shipping no javascript. I would really like to see the Astro community grow.',
				link: 'https://astro.build/'
			},
			{
				title: 'Tailwind CSS (Styling)',
				description:
					'Tailwind with a component based library like React is like having super powers. I know there are some strong opinions towards Tailwind but I have found it really does reduce styling friction in my projects, not having to context switch between files and having view logic, styling, and structure all in one file is amazing. It would be hard for me to go back to writing vanilla CSS.',
				link: 'https://tailwindcss.com/'
			},
			{
				title: 'Flutter (Mobile and Desktop Apps)',
				description:
					'Flutter is my choice for building apps across platforms. I like its performance and the ability to build for mobile and desktop from a shared codebase.',
				link: 'https://flutter.dev/'
			},
			{
				title: 'Elixir, Plug & Cowboy (APIs)',
				description:
					'Elixir with Plug and Cowboy is now my preferred stack for APIs. Elixir is great for building concurrent applications, and its functional programming style fits the way I like to write software.',
				link: 'https://elixir-lang.org/'
			},
			{
				title: 'Rust (High performance or critical system components)',
				description:
					'I would use Rust across the stack to write any system components that need to be high performance or need to be correct. You could use Rust compiled to WASM to build a high performance search index in a web app. It is also great for heavy CPU bound tasks on the backend, such as image processing.',
				link: 'https://www.rust-lang.org/'
			},
			{
				title: 'Cloudflare Services',
				description:
					'I like Cloudflare for its extremely generous free tier and useful cloud primitives. Object storage, durable execution with Workflows, AI Search, and AI Gateway are some of the services I reach for when building products.',
				link: 'https://www.cloudflare.com/developer-platform/'
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
