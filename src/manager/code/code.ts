/**
 * 整合 手机验证码 和 邮箱验证码
 */

import { CODE_ACTION_TYPE, CODE_ACTION_PATH, CODE_PLATFORM } from "../../enum";
import { EmailModel } from "./email";
import Sms, { CodeManagerInterface } from "./sms";
import { ManageResponse } from "../response";

interface SendCodeProps {
  user: string;
  path: CODE_ACTION_PATH;
  type: CODE_ACTION_TYPE;
  platform: CODE_PLATFORM;
}
interface ValidateCodeProps extends SendCodeProps {
  code: string;
}


class CodeManager {
  private _selectManage(path: CODE_ACTION_PATH): null | EmailModel | Sms {
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
  private _safeRequestCheckBeforeSendCode(user: string, type: CODE_ACTION_TYPE): boolean {
    // 安全检查，如果短时间内多次请求视为不合法
    return false
  }
  private _typeStringBuilder(path: CODE_ACTION_PATH, type: CODE_ACTION_TYPE, platform: CODE_PLATFORM): string {
    return `${path}_${platform}_${type}`
  }
  async sendCode(data: SendCodeProps): Promise<ManageResponse> {
    const { user, path, type, platform } = data
    const manager = this._selectManage(path)
    if (!manager) {
      return
    }
    const result = await manager.sendCode(user, this._typeStringBuilder(path, type, platform))
    return result
  }
  async validateCode(data: ValidateCodeProps): Promise<ManageResponse> {
    const { user, path, type, code, platform } = data
    const manager = this._selectManage(path)
    if (!manager) {
      return
    }
    const result = await manager.validateCode(user, this._typeStringBuilder(path, type, platform), code)
    return result
  }
}

export default CodeManager