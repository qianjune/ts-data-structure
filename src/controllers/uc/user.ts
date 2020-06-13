import { UserService } from "@src/models/user";
import { MobileService } from "./mobile";
import { CODE_ACTION_TYPE } from "@src/enum";
const userService = new UserService()
const mobileService = new MobileService()

interface MobileCode {
  code: string;
  mobile: string;
}

interface UserControlModel {
  // 手机注册 // 手机注册实际上是创建用户并绑定手机
  mobileRegister(body: MobileCode): void;
  // 手机登录（不包含注册） 
  mobileLogin(body: MobileCode): void;
  // 手机登录（包含注册）
  mobileLoginWithRegister(body: MobileCode): void;
}

class UserControl implements UserControlModel {
  async mobileRegister(body: MobileCode): Promise<void> {
    const { mobile } = body
    // 验证验证码
    if (!mobileService.validateCode({ ...body, type: CODE_ACTION_TYPE.REGISTER })) {
      // throw 验证码没通过
    }
    let user = await userService.getValidUser({ mobile })
    if (user) {
      // throw 该手机已经注册用户 // 这里不包含微信支付宝同手机情况
    }
    user = await userService.createUser({ mobile })
  }
  async mobileLogin(body: MobileCode): Promise<void> {
    const { mobile } = body
    // 验证验证码
    if (!mobileService.validateCode({ ...body, type: CODE_ACTION_TYPE.LOGIN })) {
      // throw 验证码没通过
    }
    const user = await userService.getValidUser({ mobile })
    if (!user) {
      // throw 该手机还未注册注册用户 // 这里不包含微信支付宝同手机情况
    }
    //  调用登录获得cookie或者jwt
  }
  async mobileLoginWithRegister(body: MobileCode): Promise<void> {
    const { mobile } = body
    // 验证验证码
    if (!mobileService.validateCode({ ...body, type: CODE_ACTION_TYPE.REGISTER })) {
      // throw 验证码没通过
    }
    let user = await userService.getValidUser({ mobile })
    if (!user) {
      user = await userService.createUser({ mobile })
    }
    //  调用登录获得cookie或者jwt
  }

}

export { UserControl }