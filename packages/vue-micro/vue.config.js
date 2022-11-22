const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container

const devServer = require('./config/devServer')
const mfConfig = require('./config/mfConfig')

module.exports = defineConfig({
  publicPath: 'auto',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer,
  chainWebpack(config) {
    config.optimization.delete('splitChunks')
  },
  configureWebpack() {
    return {
      plugins: [new ModuleFederationPlugin(mfConfig)],
    }
  },
})
