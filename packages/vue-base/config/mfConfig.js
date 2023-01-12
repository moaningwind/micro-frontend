module.exports = {
  name: 'base',
  remotes: {
    '@common': 'common@/COMMON_ASSETS/mf.js',
    '@micro': 'micro@/MICRO_ASSETS/mf.js',
  },
  shared: {
    vue: { requiredVersion: '^2.7.0', singleton: true },
  },
}
