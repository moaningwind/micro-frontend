/**
 * sm2加密算法公用方法
 **/
import smCrypto from 'sm-crypto'
import Hex from './hex'

class SmCryptoClass {
  constructor() {
    // 公钥
    this.pubKey = '04b4fec9653067ecb4c164389888ec5b1c686ac271182c738818f82756c6422df6d78797ddd7410b6b87814f1303a8fa158e197c267c18866c415aa7dd84b1a250'
    // key 基础字段
    this.rootStr = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    this.rndNum = 0
    // 1 - C1C3C2，0 - C1C2C3，默认为1
    this.cipherMode = 1
    // sm2 算法实体
    this.sm2 = smCrypto.sm2
    // sm2 算法实体
    this.sm3 = smCrypto.sm3
    // sm4 算法实体
    this.sm4 = smCrypto.sm4
    this.hex = new Hex()
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
  createKeypair() {
    return this.sm2.generateKeyPairHex()
    /* keypair: {
      publicKey: '', // 公钥
      privateKey: '' // 私钥
    }, */
  }

  // Sm2 加密
  encryptSm2(msgString) {
    return this.sm2.doEncrypt(msgString, this.pubKey, this.cipherMode)
  }

  // Sm2 加密
  encryptSm2Fn(msgString, pubKey) {
    return this.sm2.doEncrypt(msgString, pubKey, this.cipherMode)
  }

  // Sm2 解密
  decryptSm2(encryptData, privateKey) {
    return this.sm2.doDecrypt(encryptData, privateKey, this.cipherMode)
  }

  // sm3 完整性验证
  encryptSm3(encryptData) {
    return this.sm3(encryptData)
  }

  // Sm4 加密
  encryptSm4(msgString, key) {
    msgString = this.hex.utf8StrToHex(msgString)
    return this.sm4.encrypt(msgString, key)
  }

  // Sm4 解密
  decryptSm4(encryptData, key) {
    let decryptData = this.sm4.decrypt(encryptData, key)
    decryptData = this.hex.hexToUtf8Str(decryptData)
    return decryptData
  }
}

export default SmCryptoClass
