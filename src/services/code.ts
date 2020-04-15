/**
 * @description 验证码服务
 */

import CodeManager from "../manager/code/code";
import { CODE_ACTION_TYPE, CODE_ACTION_PATH } from "../enum";
const codeManager = new CodeManager()
class CodeService {
  /**
   * 发送手机验证码
   * @param user 
   * @param type 
   */
  static async sendCodeByMobile(user: string, type = CODE_ACTION_TYPE.COMMON): Promise<void> {
    const result = await codeManager.sendCode({
      user,
      type,
      path: CODE_ACTION_PATH.MOBILE
    })
    if (result.success) {
      throw new global.errs.SuccessForMini(result.msg, result.data)
    }
    throw new global.errs.FailForMini(result.msg)
  }
  /**
   * 验证手机验证码
   * @param user 
   * @param type 
   * @param code 
   */
  static async validateCodeByMobile(user: string, type = CODE_ACTION_TYPE.COMMON, code: string): Promise<void> {
    const result = await codeManager.validateCode({
      user,
      type,
      path: CODE_ACTION_PATH.MOBILE,
      code
    })
    if (result.success) {
      throw new global.errs.SuccessForMini(result.msg, result.data)
    }
    throw new global.errs.FailForMini(result.msg)
  }
  /**
   * 发送邮箱验证码
   * @param user 
   * @param type 
   */
  static async sendCodeByEmail(user: string, type = CODE_ACTION_TYPE.COMMON): Promise<void> {
    const result = await codeManager.sendCode({
      user,
      type,
      path: CODE_ACTION_PATH.EMAIL
    })
    if (result.success) {
      throw new global.errs.SuccessForMini(result.msg, result.data)
    }
    throw new global.errs.FailForMini(result.msg)
  }
  /**
   * 验证邮箱验证码
   * @param user 
   * @param type 
   * @param code 
   */
  static async validateCodeByEmail(user: string, type = CODE_ACTION_TYPE.COMMON, code: string): Promise<void> {
    const result = await codeManager.validateCode({
      user,
      type,
      path: CODE_ACTION_PATH.EMAIL,
      code
    })
    console.log('service层', result)
    if (result.success) {
      throw new global.errs.SuccessForMini(result.msg, result.data)
    }
    throw new global.errs.FailForMini(result.msg)
  }
}

export default CodeService