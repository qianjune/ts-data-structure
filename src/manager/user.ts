/**
 * @description 用户 manager
 */

import { User } from "@src/db/models";
import JwtHandler from "@src/utils/jwt_handler";
import SessionCookieHandler from "@src/utils/session_cookie";
import { CommonManagerInterface } from './interface'

interface UserBody {
  mobile?: number | string;
  password?: string;
  email?: string;
}
interface UserPutBody {
  mobile?: number;
  password?: string;
  email?: string;
  id: string;
}
type UserServiceInterface = CommonManagerInterface<UserBody,UserPutBody> 

class UserManager implements UserServiceInterface {
  async getValidateData(data: {}): Promise<User | undefined> {
    const user = await User.findOne({
      where: data
    })
    return user
  }
  async creat(data: UserBody): Promise<any> {
    let user = await this.getValidateData({ mobile: data.mobile })
    if (user) {
      // 该手机已注册
      console.log('用户已存在')
      return user.toJSON()
    }
    user = await User.create(data)
    if (user) {
      // 成功创建
      console.log('成功创建')
      return user.toJSON()
    } else {
      // 失败
      return false
    }

  }
  async update(data: UserPutBody): Promise<void> {
    const user = await this.getValidateData({ id: data.id })
    if (user) {

    }
  }
  async destroy(id: string): Promise<void> {
    const user = await this.getValidateData({ id })
    if (user) {
      const result = await User.update({ status: 'destroy' }, { where: { id } })
      if (result[0] > 0) {
        // 修改成功
      } else {
        // 修改失败
      }
    } else {
      // 没有该用户
    }
  }
  async loginJwt(uid: string){
    // 生成session 或者 jwt
    const jwt = JwtHandler.encrypt({id:uid})
    return jwt
  }
}

export {
  UserManager

}

