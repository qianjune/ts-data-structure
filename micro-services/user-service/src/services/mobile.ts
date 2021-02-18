/**
 * @description 手机相关服务
 */

import { CODE_ACTION_PATH, CODE_ACTION_TYPE, CODE_PLATFORM } from "@src/enum";
import { ManagerResponseFailure } from "@src/manager/response";
import { UserManager } from "@src/manager/user";
import { UserInfoInterface } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import CodeManager from "../manager/code";
const userManager = new UserManager();
const codeManager = new CodeManager();
class MobileService {
  async bind(data: {
    token: string;
    code: string;
    mobile: string;
    userInfo: UserInfoInterface;
  }): Promise<void> {
    const { token, code, mobile, userInfo } = data;
    // 检查是否已绑定手机
    if (userInfo.mobile) {
      ResponseHandler.send(
        new ManagerResponseFailure({ msg: "该账号已绑定手机" })
      );
    }

    // 校验验证码和token
    const result = await codeManager.validateCode({
      path: CODE_ACTION_PATH.EMAIL,
      type: CODE_ACTION_TYPE.BIND,
      platform: CODE_PLATFORM.WEB,
      user: mobile,
      code,
      token,
    });
    if (result.success) {
      // 更新用户手机数据
      const updateResult = await userManager.edit({
        id: userInfo.id,
        mobile,
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
    if (!userInfo.mobile) {
      ResponseHandler.send(
        new ManagerResponseFailure({ msg: "该账号未绑定手机" })
      );
    }
    // 校验验证码和token
    const result = await codeManager.validateCode({
      path: CODE_ACTION_PATH.EMAIL,
      type: CODE_ACTION_TYPE.UNBIND,
      platform: CODE_PLATFORM.WEB,
      user: userInfo.mobile,
      code,
      token,
    });
    if (result.success) {
      // 更新用户手机数据
      const updateResult = await userManager.edit({
        id: userInfo.id,
        mobile: null,
      });
      ResponseHandler.send(updateResult, { session: updateResult.data });
    } else {
      ResponseHandler.send(new ManagerResponseFailure(result));
    }
  }
  async validateCode(data: {
    token: string;
    code: string;
    mobile: string;
  }): Promise<void> {
    const { token, code, mobile } = data;
    if (!mobile) {
      ResponseHandler.send(
        new ManagerResponseFailure({ msg: "该账号未绑定手机" })
      );
    }
    // 校验验证码和token
    const result = await codeManager.validateCode({
      path: CODE_ACTION_PATH.EMAIL,
      type: CODE_ACTION_TYPE.COMMON,
      platform: CODE_PLATFORM.WEB,
      user: mobile,
      code,
      token,
    });
    ResponseHandler.send(result);
  }
  async sendCode({
    mobile,
    type,
  }: {
    mobile: string;
    type: CODE_ACTION_TYPE;
  }): Promise<void> {
    if (!mobile) {
      ResponseHandler.send(
        new ManagerResponseFailure({ msg: "mobile不能为空" })
      );
    }
    const result = await codeManager.sendCode({
      path: CODE_ACTION_PATH.EMAIL,
      type,
      platform: CODE_PLATFORM.WEB,
      user: mobile,
    });
    console.log(result, "...");
    ResponseHandler.send(result);
  }
  getList?(data: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default MobileService;
