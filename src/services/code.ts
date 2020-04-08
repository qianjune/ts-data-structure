/**
 * @description 验证码服务
 */

import CodeManager from "../manager/code/code";
import { CODE_ACTION_TYPE, CODE_ACTION_PATH } from "../enum";
const codeManager = new CodeManager()
class CodeService {
  static async sendCodeByMobile(user: string, ) {
    const result = await codeManager.sendCode({
      user,
      type: CODE_ACTION_TYPE.REGISTER,
      path: CODE_ACTION_PATH.MOBILE
    })
    console.log('最终结果：', result)
  }
}

export default CodeService