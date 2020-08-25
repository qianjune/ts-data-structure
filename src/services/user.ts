import { UserManager } from "@src/manager/user"
import JwtHandler from "@src/utils/jwt_handler"

/**
 * @description 用户 service
 */
const userManager = new UserManager()
class UserService {
  static async login(user: string, code: string): Promise<void> {
    console.log(user, code)
    const result = await userManager.create({ mobile: user })
    console.log('最后得到的用户', result)
    // if(!result) throw global.errs.
  }

  static async registerAndLoginForApp(user: string, model: 'jwt' | 'session' = 'jwt'): Promise<any> {
    // 首先验证验证码，查找是否有该用户
    const realUser = await userManager.getValidateData({ mobile: user }, 'self')
    let result;
    // 如果没有就创建新用户
    if (!realUser) {
      const createdUser = await userManager.create({ mobile: user })
      if (!createdUser) throw new global.errs.FailForMini('创建用户失败，请稍后再试')
      result = createdUser
    } else {
      result = realUser.toJSON()
    }
    // 调用登录，返回session或者jwt
    if (model === 'jwt') {
      console.log(realUser)
      // return userManager.loginJwt((realUser.toJSON() as any).id)
      return {
        userInfo: JwtHandler.encrypt(result)
      }
    } else {
      return {
        userInfo: result,
        session: result
      }
    }
  }
}

export default UserService