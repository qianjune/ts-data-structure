/**
 * @description 用户 service
 */

import { UserManager } from "../manager/user"
const userManager = new UserManager()
class UserService {
  static async login(user: string, code: string): Promise<void> {
    console.log(user, code)
    const result = await userManager.createUser({ mobile: user })
    console.log('最后得到的用户', result)
    // if(!result) throw global.errs.
  }

  static async registerAndLoginForApp(user: string): Promise<any> {
    // 首先验证验证码
    // 查找是否有该用户
    let realUser = await userManager.getValidUser({ mobile: user })
    // 如果没有就创建新用户
    if (!realUser) {
      const createdUser = await userManager.createUser({ mobile: user })
      if (!createdUser) throw new global.errs.FailForMini('创建用户失败，请稍后再试')
      realUser = createdUser
    }
    // 调用登录，返回session或者jwt
  }
}

export default UserService