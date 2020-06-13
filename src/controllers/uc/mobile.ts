/**
 * @description 手机相关服务
 */

import { CODE_ACTION_TYPE } from "@src/enum";
import Sms from "../../manager/code/sms";

interface MobileBody {
  mobile: string;
  smsCode: string;
  picCode: string;
  token: string;
}
export interface MobileCode {
  code: string;
  // picCode: string;
  type: CODE_ACTION_TYPE;
  mobile: string;
}

interface CommonClass {
  bind(data: MobileBody): void;
  unbind(data: MobileBody): void;
  reset(data: MobileBody): void;
  replace(data: MobileBody): void;
  sendCode(data: MobileCode): void;
  validateCode(data: MobileCode): Promise<boolean>;
  _validateCode(): void;
}

class MobileService implements CommonClass {
  bind(data: MobileBody): void {
    // 检查是否已有绑定

  }
  unbind(data: MobileBody): void {
    throw new Error("Method not implemented.");
  }
  reset(data: MobileBody): void {
    throw new Error("Method not implemented.");
  }
  replace(data: MobileBody): void {
    throw new Error("Method not implemented.");
  }
  sendCode(data: MobileCode): void {
    throw new Error("Method not implemented.");
  }
  async validateCode(data: MobileCode): Promise<boolean> {
    const { mobile, code } = data
    // return Sms.validateSms(mobile,,code)
    return false
  }
  _validateCode(): void {
    throw new Error("Method not implemented.");
  }


}

export {
  MobileService
}