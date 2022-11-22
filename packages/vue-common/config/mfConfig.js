module.exports = {
  name: 'common',
  filename: 'mf.js',
  exposes: {
    // 核心库统一管理
    './core/vue-router': './src/core/vue-router',
    './core/vuex': './src/core/vuex',
    './core/element-ui': './src/core/element-ui',
    './core/echarts': './src/core/echarts',
    // 组件库 全部引入
    './components': './src/components',
    // 组件库 按需引入
    './components/NTable': './src/components/NTable',
    './components/NForm': './src/components/NForm',
    // 指令库 全部引入
    './directives': './src/directives',
    // 指令库 按需引入
    './directives/resize': './src/directives/resize',
    './directives/spring': './src/directives/spring',
    './directives/waves': './src/directives/waves',
    // pages
    './pages/401': './src/pages/error/401',
    './pages/404': './src/pages/error/404',
    './pages/500': './src/pages/error/500',
    // 工具库 按需引入
    './utils/cache': './src/utils/cache',
    './utils/dayjs': './src/utils/dayjs',
    './utils/file': './src/utils/file',
    './utils/http': './src/utils/http',
    './utils/lodash': './src/utils/lodash',
  },
  shared: {
    vue: { requiredVersion: '^2.7.0', singleton: true },
  },
}
