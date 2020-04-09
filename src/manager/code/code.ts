/**
 * 整合 手机验证码 和 邮箱验证码
 */

import { CODE_ACTION_TYPE, CODE_ACTION_PATH } from "../../enum";
import { EmailModel } from "./email";
import Sms, { CodeManagerInterface } from "./sms";
import { ManageResponse } from "../response";

interface SendCodeProps {
  user: string;
  path: CODE_ACTION_PATH;
  type: CODE_ACTION_TYPE;
}
interface ValidateCodeProps extends SendCodeProps {
  code: string;
}

class CodeManager {
  _selectManage(path: CODE_ACTION_PATH): null | EmailModel | Sms {
    let manager = null as CodeManagerInterface
    switch (path) {
      case CODE_ACTION_PATH.EMAIL:
        manager = new EmailModel()
        break;
      case CODE_ACTION_PATH.MOBILE:
        manager = new Sms()
        break;
      default:
        break;
    }
    return manager
  }
  async sendCode(data: SendCodeProps): Promise<ManageResponse> {
    const { user, path, type } = data
    const manager = this._selectManage(path)
    if (!manager) {
      return
    }
    const result = await manager.sendCode(user, type)
    return result
  }
  async validateCode(data: ValidateCodeProps): Promise<ManageResponse> {
    const { user, path, type, code } = data
    const manager = this._selectManage(path)
    if (!manager) {
      return
    }
    const result = await manager.validateCode(user, type, code)
    return result
  }
}

export default CodeManager