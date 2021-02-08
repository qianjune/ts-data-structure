/**
 * @description 验证码服务
 */

import CodeManager from "@micro-services/user-service/src/manager/code";
import { CODE_ACTION_TYPE, CODE_ACTION_PATH, CODE_PLATFORM } from "@src/enum";
import { ResponseHandler } from "@src/utils/responseHandler";
import JwtHandler from "@src/utils/jwt_handler";
import { ManagerResponse, ManagerResponseFailure } from "@src/manager/response";
import { ValidateCodeModel } from "@root/cache/validateCode";
import UserService from "./user";
import CommonService from "./common";
const codeManager = new CodeManager();
class CodeService {
  /**
   * 发送手机验证码
   * @param user
   * @param type
   */
  static async sendCodeByMobile(
    user: string,
    type = CODE_ACTION_TYPE.COMMON,
    captcha?: string
  ): Promise<void> {
    // 验证图片验证码是否输入正确
    await CommonService.captchaValidate(user, type, captcha);
    const result = await codeManager.sendCode({
      user,
      type,
      path: CODE_ACTION_PATH.MOBILE,
      platform: CODE_PLATFORM.MINI,
      mock: global.state.mock,
    });
    console.log("result..", result);

    ResponseHandler.send(result);
  }
  /**
   * 验证手机验证码
   * @param user
   * @param type
   * @param code
   */
  static async validateCodeForOneClickLoginByMobile(
    user: string,
    type = CODE_ACTION_TYPE.COMMON,
    code: string
  ): Promise<void> {
    const result = await codeManager.validateCode({
      user,
      type: CODE_ACTION_TYPE.REGISTER_AND_LOGIN,
      path: CODE_ACTION_PATH.MOBILE,
      code,
      platform: CODE_PLATFORM.MINI,
    });
    if (result.success) {
      throw new global.errs.SuccessForMini(result.msg, result.data);
    }
    throw new global.errs.FailForMini(result.msg);
  }
  /**
   * 验证手机验证码
   * @param user
   * @param type
   * @param code
   */
  static async validateCodeByMobile(
    user: string,
    type = CODE_ACTION_TYPE.COMMON,
    code: string
  ): Promise<void> {
    const result = await codeManager.validateCode({
      user,
      type,
      path: CODE_ACTION_PATH.MOBILE,
      code,
      platform: CODE_PLATFORM.MINI,
    });
    console.log("-------result---------");
    console.log(result);
    const { userInfo, session = "" } = await UserService.registerAndLoginForApp(
      user,
      "session"
    );
    result.data = userInfo;
    ResponseHandler.send(result, { session });
  }
  /**
   * 发送邮箱验证码
   * @param user
   * @param type
   */
  static async sendCodeByEmail(
    user: string,
    type = CODE_ACTION_TYPE.COMMON
  ): Promise<void> {
    const result = await codeManager.sendCode({
      user,
      type,
      path: CODE_ACTION_PATH.EMAIL,
      platform: CODE_PLATFORM.MINI,
    });
    ResponseHandler.send(result);
  }
  /**
   * 验证邮箱验证码
   * @param user
   * @param type
   * @param code
   */
  static async validateCodeByEmail(
    user: string,
    type = CODE_ACTION_TYPE.COMMON,
    code: string
  ): Promise<void> {
    const result = await codeManager.validateCode({
      user,
      type,
      path: CODE_ACTION_PATH.EMAIL,
      code,
      platform: CODE_PLATFORM.MINI,
    });
    console.log("service层", result);
    ResponseHandler.send(result);
  }
}

export default CodeService;
