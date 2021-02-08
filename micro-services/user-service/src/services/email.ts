/**
 * @description 邮箱相关服务
 */

import { CODE_ACTION_PATH, CODE_ACTION_TYPE, CODE_PLATFORM } from "@src/enum";
import { ManagerResponse, ManagerResponseFailure } from "@src/manager/response";
import { UserInfoInterface } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import CodeManager from "../manager/code";
const codeManager = new CodeManager();
class EmailService {
  async bind(data: {
    token: string;
    code: string;
    email: string;
    userInfo: any;
  }): Promise<void> {
    const { token, code, email, userInfo } = data;
    new ResponseHandler();
  }
  edit(data: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
  del(id: number): Promise<void> {
    throw new Error("Method not implemented.");
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
