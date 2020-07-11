/**
 * @description 验证码处理类
 */
import { get, set, del } from './_redis'
import bcrypt from 'bcryptjs'

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
    const salt = bcrypt.genSaltSync(10)
    set(
      this._buildSaveKey(user, key),
      bcrypt.hashSync(code.toString(), salt),
      60 * 60
    )
  }
  static async validateCode({ user, code, key }: ValidateCodeProps): Promise<boolean> {
    const saveKey = this._buildSaveKey(user, key)
    const savedCode = await get(saveKey)
    // const result = (savedCode || '').toString() === code.toString()
    const result = bcrypt.compareSync(code.toString(), (savedCode || '').toString())
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