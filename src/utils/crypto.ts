/*
 * @Author: hfWang
 * @Date: 2022-10-10 20:53:21
 * @LastEditTime: 2022-10-12 20:18:21
 * @Description: file content
 * @FilePath: \vite-react-template\src\utils\crypto.ts
 */
import CryptoJS from 'crypto-js' // 准备跟换为 cryptojs

export interface CryptoType {
  encrypt: (word: string) => string
  decrypt: (word: string) => string
  md5: (word: string) => string
  base64: (word: string) => string
}

/**
 * @desc aes 加解密
 */
class Crypto implements CryptoType {
  private key: CryptoJS.lib.WordArray
  private iv: CryptoJS.lib.WordArray
  constructor() {
    this.key = CryptoJS.enc.Utf8.parse('dukwn836chty28o9') // 16位16进制数作为密钥
    this.iv = CryptoJS.enc.Utf8.parse('pomcjew8764f32ff') // 16位16进制数作为密钥偏移量
  }

  /**
   * @desc AES 加密
   * @param word 要加密的数据
   */
  public encrypt = (word: string) => {
    const utf8Str = CryptoJS.enc.Utf8.parse(word)
    console.log('utf8Str', utf8Str)
    const encrypted = CryptoJS.AES.encrypt(utf8Str, this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
    const result = encrypted.ciphertext.toString().toUpperCase()
    return result
  }

  /**
   * @desc AES 解密
   * @param word 要解密的数据
   */
  public decrypt = (word: string) => {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(word)
    const base64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
    const decrypt = CryptoJS.AES.decrypt(base64Str, this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
    const decryptStr = decrypt.toString(CryptoJS.enc.Utf8).toString()
    return decryptStr
  }

  /**
   * @desc md5 加密(不可逆)
   * @param word 要加密的数据
   */
  public md5 = (word: string) => {
    return CryptoJS.MD5(word).toString()
  }

  /**
   * @desc base64 加密
   * @param word 要加密的数据
   */
  public base64 = (word: string) => {
    const utf8Str = CryptoJS.enc.Utf8.parse(word)
    return CryptoJS.enc.Base64.stringify(utf8Str)
  }
}

const crypto = new Crypto()
export default crypto
