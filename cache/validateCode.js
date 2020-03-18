import { get, set } from './_redis'

class ValidateCodeModel {
  static _buildSaveKey(user, key = 'common') {
    return `${user}_${key}`
  }
  static async saveCode({ user, key, code }) {
    set(this._buildSaveKey(user, key), code, 60 * 60)
  }
  static async validateCode({ user, code, key }) {
    const savedCode = await get(_buildSaveKey(user, key))
    return savedCode === code
  }
}

export {
  ValidateCodeModel
}