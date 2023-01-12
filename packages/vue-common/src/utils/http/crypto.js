/**
 * 加密算法公用方法
 **/
import CryptoJs from 'crypto-js' // aes 加密
import JSEncrypt from 'jsencrypt' // rsa 加密

class Encrypt {
  constructor() {
    // 公钥
    this.pubKey
      = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDn1obzUZPUqUcLIkJrXdBvRT4lhEbp1toLdTwua2zH+cMZX5aAkbK7wcrf4DRDHwq4VDtoEP4afAYD+Saw7bDu3XFf5gJwguW+acSXgtsxcuIcfF7aXvnFgdDWkqnD69jHRBXfrVOyiWGIs5wDmjbZcmoh7nP0z+d8dezuRbL5kQIDAQAB'
    // key 基础字段
    this.rootStr = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    this.rndNum = 0
  }

  // 生成指定位数key
  rndStr(len) {
    let resultStr = ''
    for (let i = 0; i < len; i++) {
      this.rndNum = parseInt(Math.random() * 62, 10)
      resultStr += this.rootStr.substring(this.rndNum, this.rndNum + 1)
    }
    return resultStr.substring(0, len)
  }

  // 生成公钥，私钥

  // RSA公钥加密
  keyJsencrypt(str) {
    // RSA加密
    const crypt = new JSEncrypt()
    // 设置公钥
    crypt.setPublicKey(this.pubKey)
    const enc = crypt.encrypt(encodeURIComponent(str))
    return enc
  }

  encryptRsaFn(str, pubKey) {
    // RSA加密
    const crypt = new JSEncrypt()
    // 设置公钥
    crypt.setPublicKey(pubKey)
    const enc = crypt.encrypt(encodeURIComponent(str))
    return enc
  }

  // RSA私钥解密
  decryptRsaByPrivateKey(encryptData, privateKey) {
    const decrypt = new JSEncrypt()
    decrypt.setPrivateKey(privateKey)
    const uncrypted = decrypt.decrypt(encryptData)
    return uncrypted
  }

  // RSA私钥加密
  encryptRsaByPrivateKey(str, privateKey) {
    const decrypt = new JSEncrypt()
    decrypt.setPrivateKey(privateKey)
    const enc = decrypt.encrypt(encodeURIComponent(str))
    return enc
  }

  // RSA公钥解密
  decryptRsa(msg) {
    const crypt = new JSEncrypt()
    crypt.setPublicKey(this.pubKey)
    const decryptMsg = crypt.decrypt(msg)
    return decryptMsg
  }

  // RSA公钥解密
  decryptRsaByPublicKey(PublicKey, msg) {
    const crypt = new JSEncrypt()
    crypt.setPublicKey(PublicKey)
    const decryptMsg = crypt.decrypt(msg)
    return decryptMsg
  }

  // AES 加密
  encryptAes(word, key) {
    const aeskey = CryptoJs.enc.Utf8.parse(key)
    const srcs = CryptoJs.enc.Utf8.parse(word)
    const encrypted = CryptoJs.AES.encrypt(srcs, aeskey, { mode: CryptoJs.mode.ECB })
    return encrypted.toString()
  }

  // AES 解密
  decryptAes(word, key) {
    const aeskey = CryptoJs.enc.Utf8.parse(key)
    const decrypt = CryptoJs.AES.decrypt(word, aeskey, { mode: CryptoJs.mode.ECB })
    return CryptoJs.enc.Utf8.stringify(decrypt).toString()
  }
}

export default Encrypt
