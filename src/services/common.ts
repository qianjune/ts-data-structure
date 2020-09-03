/**
 * @description 通用服务-（图片验证码验证
 */
import { CODE_ACTION_TYPE } from "@src/enum"
import { ValidateCodeModel } from "@root/cache/validateCode"
import { ResponseHandler } from "@src/utils/responseHandler"
import { ManagerResponseFailure } from "@src/manager/response"

class CommonService {
  static async captchaValidate(
    user: string, type = CODE_ACTION_TYPE.COMMON, captcha?: string
  ): Promise<void> {
    if (captcha) {
      const validateCaptchaCode = await ValidateCodeModel.validateCode({ user, code: captcha, key: type + '-' + 'captcha' })
      if (!validateCaptchaCode) {
        ResponseHandler.send(new ManagerResponseFailure({ msg: '图片验证码错误' }))
      }
    }
  }
}

export default CommonService