// @ts-check

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/vsDark')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Marcus's Convenience Store",
  tagline: 'My own store of concepts, tools, patterns, snippets, and more!',
  url: 'https://store.marcusv.me',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'MarcusVirg',
  projectName: 'convenience-store',

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/MarcusVirg/web/tree/main/packages/convenience-store/docs'
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.css')]
        }
      }
    ]
  ],

  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  themeConfig: {
    navbar: {
      title: "Marcus's Convenience Store",
      logo: {
        alt: 'Convenience Store',
        src: 'img/logo.svg'
      },
      items: [
        {
          type: 'doc',
          docId: 'code/intro',
          position: 'left',
          label: 'Code'
        },
        {
          type: 'doc',
          docId: 'patterns/intro',
          position: 'left',
          label: 'Patterns'
        },
        {
          type: 'doc',
          docId: 'process/intro',
          position: 'left',
          label: 'Process'
        },
        {
          href: 'https://github.com/MarcusVirg',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Isles',
          items: [
            {
              label: 'Code',
              to: '/docs/code/intro'
            },
            {
              label: 'Patterns',
              to: '/docs/patterns/intro'
            },
            {
              label: 'Process',
              to: '/docs/process/intro'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/MarcusVirg'
            }
          ]
        },
        {
          title: 'More',
          items: [
            {
              label: 'Portfolio',
              to: 'https://marcusv.me'
            },
            {
              label: 'Blog',
              to: 'https://marcusv.me/blog'
            },
            {
              label: 'GitHub',
              href: 'https://github.com/MarcusVirg'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} MarcusVirg. Built with Docusaurus.`
    },
    prism: {
      /** @type {import("prism-react-renderer").PrismTheme} */
      // @ts-ignore
      theme: lightCodeTheme,
      /** @type {import("prism-react-renderer").PrismTheme} */
      // @ts-ignore
      darkTheme: darkCodeTheme
    },
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true
    }
  }
}

module.exports = config
