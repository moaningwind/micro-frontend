const devServer = {
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  port: 9002,
  proxy: {
    '/COMMON_ASSETS': {
      target: 'http://localhost:9001', // 需要修改为远程url
      changeOrigin: true,
      pathRewrite: {
        '^/COMMON_ASSETS': '/',
      },
    },
    '/MICRO_ASSETS': {
      target: 'http://localhost:9000', // 需要修改为远程url
      changeOrigin: true,
      pathRewrite: {
        '^/MICRO_ASSETS': '/',
      },
    },
  },
}

module.exports = devServer
