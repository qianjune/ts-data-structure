/**
 * @description 通用加密解密
 */

import bcrypt from 'bcryptjs'

class EncryptBox {
  static buildEncryptCode(code: string): string {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(code.toString(), salt)
  }
  static validateEncryptCode(inputCode: string, savedCode: string,): boolean {
    return bcrypt.compareSync(inputCode.toString(), (savedCode || '').toString())
  }
}

export default EncryptBox