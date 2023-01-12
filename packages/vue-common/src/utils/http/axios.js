import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { isArray, isNil, isObject, isString } from 'lodash'
import Hex from './hex'
import Encrypt from './crypto'
import SmCrypto from './smCrypto'
import httpErrorConfig from './httpErrorConfig'
import { xssTest } from './xss'

function isJson(val) {
  // Es10 catch 可以不写error
  try {
    JSON.parse(val)
    return true
  }
  catch {
    return false
  }
}

class HttpRequest {
  constructor(options) {
    // paramsWepMethod 参数加密方式 Aes Sm4 默认为 Aes
    // keyWepMethod key的加密方式 Rsa Sm2，默认为 Rsa
    // isFileEncrypt 是否开启文件加密
    this.options = options
    this.key = ''
    this.hex = new Hex()
    this.encrypt = new Encrypt()
    this.SmCrypto = new SmCrypto()
    this.axiosCancel = null
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  setupInterceptors() {
    // 请求拦截
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const { isEncrypt, isXssTest } = config

        if (this.options.paramsWepMethod === 'Sm4')
          this.key = this.hex.utf8StrToHex(this.SmCrypto.rndStr(16))
        else
          this.key = this.SmCrypto.rndStr(16)

        config.headers.requestTime = this.encryptParams(new Date().getTime(), this.key)

        let secretKey = ''
        if (this.options.keyWepMethod === 'Sm2')
          secretKey = this.SmCrypto.encryptSm2(this.key)
        else
          secretKey = this.encrypt.keyJsencrypt(this.key)

        // 加密 data
        const data = config.data
        const xssError = '您当前提交的字符可能威胁系统安全，不允许提交！'

        const xssErrorTip = () => {
          MessageBox.confirm(xssError, '警告', {
            showCancelButton: false,
            type: 'warning',
          })
          this.axiosCancel()
        }

        if (data) {
          if (isXssTest !== false && xssTest(JSON.stringify(data))) {
            xssErrorTip()
            return Promise.reject(xssError)
          }

          if (isEncrypt !== false) {
            this.encryptArrayOrMap(data)
            config.headers.secretKey = secretKey
          }

          config.headers.hash = this.SmCrypto.encryptSm3(JSON.stringify(data))
        }

        // 加密 params
        const params = config.params
        if (params) {
          if (isXssTest !== false && xssTest(JSON.stringify(params))) {
            xssErrorTip()
            return Promise.reject(xssError)
          }

          if (this.options.isFileEncrypt) {
            params.name = this.encryptParams(params.name, this.key)
            config.headers.fileSecretKey = secretKey
          }
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    // 响应拦截
    this.axiosInstance.interceptors.response.use(
      (res) => {
        const jsonData = res.data
        let { hashKey, reskey } = res.headers
        // 数据防篡改
        if (hashKey) {
          hashKey = this.encrypt.decryptRsa(hashKey)
          const resHashKey = this.SmCrypto.encryptSm3(jsonData.data.detail)
          if (hashKey !== resHashKey) {
            Message.error('请注意，数据被篡改！')
            const { headers, status } = res
            return {
              headers,
              data: {
                code: -11105,
                data: {},
                message: '数据被篡改',
                status,
              },
            }
          }
        }

        // 公钥解密
        if (reskey) {
          reskey = this.encrypt.decryptRsa(reskey)
          const resData = this.encrypt.decryptAes(jsonData.data.detail, reskey)
          jsonData.data = isJson(resData) ? JSON.parse(resData) : resData
        }

        return res
      },
      (error) => {
        const errorInfo = error.response
        if (errorInfo) {
          // http请求错误弹窗显示
          const { title, content, type } = httpErrorConfig
          content.forEach((item) => {
            if (item.code === errorInfo.status) {
              MessageBox.confirm(item.tip, title, {
                showCancelButton: false,
                type,
              })
            }
          })
        }
        return Promise.reject(error)
      },
    )
  }

  request(options) {
    // tip: axios 0.22.0 以上不再支持
    options.cancelToken = new axios.CancelToken((cancel) => {
      this.axiosCancel = cancel
    })

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(options)
        .then((res) => {
          resolve(res)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  encryptArrayOrMap(data) {
    if (isArray(data))
      return this.encryptArray(data)
    else if (isObject(data))
      return this.encryptMap(data)
  }

  isNoArrayOrMap(data) {
    return !isObject(data) && !isArray(data)
  }

  encryptMap(dataMap) {
    for (const item in dataMap) {
      if (this.isNoArrayOrMap(dataMap[item])) {
        if (isNil(dataMap[item]))
          dataMap[item] = ''
        dataMap[item] = this.encryptParams(dataMap[item], this.key)
      }
      else {
        this.encryptArrayOrMap()
      }
    }
    return dataMap
  }

  encryptArray(dataArray) {
    for (let i = 0; i < dataArray.length; i++) {
      if (this.isNoArrayOrMap(dataArray[i])) {
        if (isNil(dataArray[i]))
          dataArray[i] = ''
        dataArray[i] = this.encryptParams(dataArray[i], this.key)
      }
      else {
        this.encryptArrayOrMap()
      }
    }
    return dataArray
  }

  // 加密
  encryptParams(msgString, key) {
    if (this.options.paramsWepMethod === 'Sm4') {
      if (isNil(msgString))
        msgString = ''
      if (isString(msgString))
        msgString = msgString.replace(/\n/g, ' ')
      return this.SmCrypto.encryptSm4(msgString, key)
    }
    else {
      return this.encrypt.encryptAes(msgString, key)
    }
  }
}

export default HttpRequest
