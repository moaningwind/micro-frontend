module.exports = {
  name: 'micro',
  filename: 'mf.js',
  remotes: {
    '@common': 'common@/COMMON_ASSETS/mf.js',
  },
  exposes: {
    './App.vue': './src/App.vue',
  },
  shared: {
    vue: { requiredVersion: '^2.7.0', singleton: true },
  },
}
