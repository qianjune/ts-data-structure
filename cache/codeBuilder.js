/**
 * @description 验证码生成器
 */

class CodeBuilder {
  /**
 * 生成验证码
 * @param {number} len 随机生成的验证码的长度
 */
  static _genValidateCode(len = 6) {
    return Math.random().toString().slice(-len)
  }
  static buildValidateCode() {
    return this._genValidateCode()
  }
}

export {
  CodeBuilder
}