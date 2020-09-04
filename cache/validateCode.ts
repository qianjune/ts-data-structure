/**
 * @description 验证码处理类
 */
import { get, set, del } from './_redis'
import bcrypt from 'bcryptjs'
import EncryptBox from '@src/utils/encrypt_box'

interface ValidateCodeProps {
  user: string | number;
  key: string;
  code: string | number;
}

class ValidateCodeModel {
  static _buildSaveKey(user: string | number, key = 'common'): string {
    return `${user}_${key}`
  }
  static async saveCode({ user, key, code }: ValidateCodeProps): Promise<void> {
    console.log('saveCode', code)
    set(
      this._buildSaveKey(user, key),
      EncryptBox.buildEncryptCode(code.toString()),
      60 * 60
    )
  }
  static async validateCode({ user, code, key }: ValidateCodeProps): Promise<boolean> {
    const saveKey = this._buildSaveKey(user, key)
    console.log(saveKey, 'saveKey')
    const savedCode = await get(saveKey)
    // const result = (savedCode || '').toString() === code.toString()
    const result = EncryptBox.validateEncryptCode(code.toString(), (savedCode || '').toString())
    console.log(result)
    if (result) {
      // 如果验证成功后，把之前保存的验证码删除
      // await del(saveKey)
    }
    return result
  }
}

export {
  ValidateCodeModel
}