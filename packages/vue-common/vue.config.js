const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container

const devServer = require('./config/devServer')
const files = require('./config/files')
const externals = require('./config/externals')
const mfConfig = require('./config/mfConfig')

module.exports = defineConfig({
  publicPath: 'auto',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer,
  chainWebpack(config) {
    // html-webpack-plugin
    config.plugin('html').tap((args) => {
      args[0].files = files
      return args
    })
    config.optimization.delete('splitChunks')

    // Don't use it
    // config.optimization.runtimeChunk('single')
  },
  configureWebpack() {
    return {
      externals,
      plugins: [new ModuleFederationPlugin(mfConfig)],
    }
  },
})
