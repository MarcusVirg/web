// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

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
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/MarcusVirg/convenience-store/tree/main/docs/'
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
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
          // { to: "/blog", label: "Blog", position: "left" },
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
              // {
              //   label: "Stack Overflow",
              //   href: "https://stackoverflow.com/questions/tagged/docusaurus",
              // },
              // {
              //   label: "Discord",
              //   href: "https://discordapp.com/invite/docusaurus",
              // },
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
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      },
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true
      }
    })
}

module.exports = config
