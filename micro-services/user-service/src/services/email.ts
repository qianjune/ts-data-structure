/**
 * @description 邮箱相关服务
 */

import { CODE_ACTION_PATH, CODE_ACTION_TYPE, CODE_PLATFORM } from "@src/enum";
import { ManagerResponseFailure } from "@src/manager/response";
import { UserManager } from "@micro-services/user-service/src/manager/user";
import { UserInfoInterface } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import CodeManager from "../manager/code";
const userManager = new UserManager();
const codeManager = new CodeManager();
class EmailService {
  async bind(data: {
    token: string;
    code: string;
    email: string;
    userInfo: UserInfoInterface;
  }): Promise<void> {
    const { token, code, email, userInfo } = data;
    // 检查是否已绑定邮箱
    if (userInfo.email) {
      ResponseHandler.send(
        new ManagerResponseFailure({ msg: "该账号已绑定邮箱" })
      );
    }

    // 校验验证码和token
    const result = await codeManager.validateCode({
      path: CODE_ACTION_PATH.EMAIL,
      type: CODE_ACTION_TYPE.BIND,
      platform: CODE_PLATFORM.WEB,
      user: email,
      code,
      token,
    });
    if (result.success) {
      // 更新用户邮箱数据
      const updateResult = await userManager.edit({
        id: userInfo.id,
        email,
      });
      ResponseHandler.send(updateResult, { session: updateResult.data });
    } else {
      ResponseHandler.send(new ManagerResponseFailure(result));
    }
  }
  async unbind(data: {
    token: string;
    code: string;
    userInfo: UserInfoInterface;
  }): Promise<void> {
    const { token, code, userInfo } = data;
    if (!userInfo.email) {
      ResponseHandler.send(
        new ManagerResponseFailure({ msg: "该账号未绑定邮箱" })
      );
    }
    // 校验验证码和token
    const result = await codeManager.validateCode({
      path: CODE_ACTION_PATH.EMAIL,
      type: CODE_ACTION_TYPE.UNBIND,
      platform: CODE_PLATFORM.WEB,
      user: userInfo.email,
      code,
      token,
    });
    if (result.success) {
      // 更新用户邮箱数据
      const updateResult = await userManager.edit({
        id: userInfo.id,
        email: null,
      });
      ResponseHandler.send(updateResult, { session: updateResult.data });
    } else {
      ResponseHandler.send(new ManagerResponseFailure(result));
    }
  }
  async validateCode(data: {
    token: string;
    code: string;
    email: string;
  }): Promise<void> {
    const { token, code, email } = data;
    if (!email) {
      ResponseHandler.send(
        new ManagerResponseFailure({ msg: "该账号未绑定邮箱" })
      );
    }
    // 校验验证码和token
    const result = await codeManager.validateCode({
      path: CODE_ACTION_PATH.EMAIL,
      type: CODE_ACTION_TYPE.COMMON,
      platform: CODE_PLATFORM.WEB,
      user: email,
      code,
      token,
    });
    ResponseHandler.send(result);
  }
  async sendCode({
    email,
    type,
  }: {
    email: string;
    type: CODE_ACTION_TYPE;
  }): Promise<void> {
    if (!email) {
      ResponseHandler.send(
        new ManagerResponseFailure({ msg: "email不能为空" })
      );
    }
    const result = await codeManager.sendCode({
      path: CODE_ACTION_PATH.EMAIL,
      type,
      platform: CODE_PLATFORM.WEB,
      user: email,
    });
    console.log(result, "...");
    ResponseHandler.send(result);
  }
  getList?(data: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default EmailService;
