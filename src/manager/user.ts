/**
 * @description 用户 manager
 */

import { User } from "../db/models";

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
interface UserServiceInterface {
  // 新增
  createUser(data: UserBody): void;
  // 更新     
  updateUser(data: UserPutBody): void;
  // 销毁
  destroyUser(id: string): void;
  // 获取用户信息
  getUserInfo(id: string): void;
  // 登录过期
  // 检查用户是否已存在
  getValidUser(data: {}): Promise<any>;

}

class UserManager implements UserServiceInterface {
  async getValidUser(data: {}): Promise<User | undefined> {
    const user = await User.findOne({
      where: data
    })
    return user
  }
  async createUser(data: UserBody): Promise<any> {
    let user = await this.getValidUser({ mobile: data.mobile })
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
  async updateUser(data: UserPutBody): Promise<void> {
    const user = await this.getValidUser({ id: data.id })
    if (user) {

    }
  }
  async destroyUser(id: string): Promise<void> {
    const user = await this.getValidUser({ id })
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
  async getUserInfo(id: string): Promise<void> {
    const user = await this.getValidUser({ id })
  }
  async login(uid: string){
    // 生成session 或者 jwt
  }
}

export {
  UserManager

}

