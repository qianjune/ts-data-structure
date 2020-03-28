/**
 * @description 用户服务
 */

import { User } from "../db/models";

interface UserBody {
  mobile?: number|string;
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

class UserService implements UserServiceInterface {
  async getValidUser(data: {}): Promise<User | undefined> {
    const user = await User.findOne({
      where: data
    })
    return user
  }
  async createUser(data: UserBody): Promise<any> {

    if (this.getValidUser({ mobile: data.mobile })) {
      // 该手机已注册
      return
    }
    const result = await User.create(data)
    if (result.getDataValue('id')) {
      // 成功创建
    }else{
      // 失败
    }

  }
  async updateUser(data: UserPutBody): Promise<void> {
    const user = await this.getValidUser({id:data.id})
    if(user){
      
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

}

export {
  UserService

}

