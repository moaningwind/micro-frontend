export default {
  author: 'wangBo',
  describe: '错误编码配置文件',
  content: {
    title: '错误',
    type: 'error',
    content: [
      {
        code: 400,
        tip: '请求错误！(400)',
      },
      {
        code: 401,
        tip: '未授权，请重新登录！(401)',
      },
      {
        code: 403,
        tip: '拒绝访问！(403)',
      },
      {
        code: 404,
        tip: '请求出错！(404)',
      },
      {
        code: 405,
        tip: '方法不被允许！(405)',
      },
      {
        code: 408,
        tip: '请求超时！(408)',
      },
      {
        code: 429,
        tip: '请求太过频繁，请稍候再试！(429)',
      },
      {
        code: 500,
        tip: 'http请求通讯错误！(500)',
      },
      {
        code: 501,
        tip: '服务未实现！(501)',
      },
      {
        code: 502,
        tip: '网络错误！(502)',
      },
      {
        code: 503,
        tip: '服务不可用！(503)',
      },
      {
        code: 504,
        tip: '网络超时！(504)',
      },
      {
        code: 505,
        tip: "'HTTP版本不受支持！(505)",
      },
    ],
  },
}