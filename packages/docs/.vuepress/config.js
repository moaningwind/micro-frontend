module.exports = {
  // theme: '',
  title: 'VuePress',
  description: 'Vue Common',
  base: '/',
  port: '4396',
  themeConfig: {
    // smoothScroll: true,
    locales: {
      '/': {
        nav: [
          {
            text: '指南',
            link: '/guide/',
          },
          {
            text: '组件',
            link: '/components/',
          },
          {
            text: '指令',
            link: '/directives/',
          },
        ],
        sidebar: {
          '/guide/': [
            {
              title: '指南',
              collapsable: false,
              children: ['/guide/essentials/'],
            },
            {
              title: '深入',
              collapsable: false,
              children: ['/guide/advanced/'],
            },
            {
              title: '其它',
              collapsable: false,
              children: ['/guide/other/issues', '/guide/other/changelog'],
            },
          ],
          '/components/': ['/components/ntable'],
          '/directives/': ['/directives/motion'],
        },
      },
    },
  },
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  plugins: ['demo-container'],
  configureWebpack: {
    resolve: {
      alias: {
        '@': '/../vue-common/src',
      },
    },
  },
  evergreen: true,
}
