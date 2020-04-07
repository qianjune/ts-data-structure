/**
 * @description 用户 service
 */

import { UserManager } from "../manager/user"
const userManager = new UserManager()
class UserService {
  static async login(user: string, code: string): Promise<void> {
    const result = await userManager.createUser({ mobile: user })
    console.log('最后得到的用户', result)
    // if(!result) throw global.errs.
  }
}

export default UserService