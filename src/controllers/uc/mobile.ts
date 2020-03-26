/**
 * @description 手机相关服务
 */

interface MobileBody {
  mobile: string;
  smsCode: string;
  picCode: string;
  token: string;
}
interface MobileCode {
  smsCode: string;
  picCode: string;
  type: string;
}
interface CommonClass {
  bind(data: MobileBody): void;
  unbind(data: MobileBody): void;
  reset(data: MobileBody): void;
  replace(data: MobileBody): void;
  sendCode(data: MobileCode): void;
  validateCode(data: MobileCode): void;
  _validateCode(): void;
}

class MobileService implements CommonClass {
  bind(data: MobileBody): void {
    throw new Error("Method not implemented.");
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
  validateCode(data: MobileCode): void {
    throw new Error("Method not implemented.");
  }
  _validateCode(): void {
    throw new Error("Method not implemented.");
  }


}

export {
  MobileService
}