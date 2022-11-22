const devServer = {
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  port: 9000,
  proxy: {
    '/COMMON_ASSETS': {
      target: 'http://localhost:9001', // 需要修改为远程url
      changeOrigin: true,
      pathRewrite: {
        '^/COMMON_ASSETS': '/',
      },
    },
  },
}

module.exports = devServer
