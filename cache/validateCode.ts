import { get, set } from './_redis'

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
    set(this._buildSaveKey(user, key), code, 60 * 60)
  }
  static async validateCode({ user, code, key }: ValidateCodeProps): Promise<boolean> {
    console.log(user, code, key)
    const savedCode = await get(this._buildSaveKey(user, key))
    console.log("savedCode:",savedCode)
    return savedCode.toString() === code.toString()
  }
}

export {
  ValidateCodeModel
}