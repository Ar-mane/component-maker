import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Component Maker",
  description: "Simplify component generation and boost productivity with Component Maker.",
  srcDir: 'src',
  outDir: 'build',
  assetsDir: 'public',
  head: [
    ['link', { rel: "icon", type: "image/svg",   href: "icon.svg" }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/icon.svg',
    search: { provider: 'local' },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Download', link: 'https://marketplace.visualstudio.com/items?itemName=Ar-mane.component-maker' }
    ],

    sidebar: [
      {
        text: 'Component Maker',
        items: [
          { text: 'Getting started', link: '/getting-started' },
          { text: 'Features', link: '/features' },
          { text: 'Installation', link: '/installation' },
          { text: 'Configurations', link: '/configurations' }
        ]
      },
      {
        text: 'Examples',
        link: '/markdown-exampsles'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Ar-mane/component-maker' }
    ]
    ,
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Ar-mane'
    },
  }
})
