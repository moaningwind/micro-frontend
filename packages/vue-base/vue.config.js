const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container

const devServer = require('./config/devServer')
const mfConfig = require('./config/mfConfig')

module.exports = defineConfig({
  assetsDir: 'static',
  productionSourceMap: false,
  devServer,
  configureWebpack() {
    return {
      plugins: [new ModuleFederationPlugin(mfConfig)],
    }
  },
})
