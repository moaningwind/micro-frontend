import HttpRequest from './axios'

const basicInstance = new HttpRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
})

export { basicInstance }

export default HttpRequest
