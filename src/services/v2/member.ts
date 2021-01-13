import { Member, User } from "@src/db/models"
import { v1 as uuidv1 } from 'uuid'
import { ResponseHandler } from "@src/utils/responseHandler"
import { ManagerResponseFailure, ManagerResponseSuccess } from "@src/manager/response"
import { CommonService } from "@src/services/interface/common"
import MemberManager from "@src/manager/v2/member"
const memberManager = new MemberManager()
/**
 * @description 会员 service
 * @author June
 */

class MemberService implements CommonService {
  /**
  * 创建会员
  * @param {*} data 
  */
  async create(data: any): Promise<void> {

    // const { userId } = data
    // const member = await User.findOne({
    //   where: {
    //     id: userId
    //   }
    // })
    // if (member === null) {
    //   ResponseHandler.send(new ManagerResponseFailure({ msg: '该会员不存在' }))
    // }
    // const memberCardCode = uuidv1()
    // data.memberCardCode = memberCardCode
    // const result = await Member.create(data)
    const res = await memberManager.create(data)
    ResponseHandler.send(res)
  }
  /**
   * 更新成长值
   * @param {*} data 
   */
  async edit(data: any): Promise<void> {
    ResponseHandler.send(await memberManager.edit(data))
  }
  del(id: number): Promise<void> {
    throw new Error("Method not implemented.")
  }
  async getInfo(id: number): Promise<void> {
    ResponseHandler.send(await memberManager.getInfo(id))
  }
  async getList?(data: any): Promise<void> {
    ResponseHandler.send(await memberManager.getList(data))
  }




  /**
  * 更新积分
  * @param {*} data 
  */
  static async updatePoints(data: any) {
    const { num, type, id } = data
    const member = await Member.findOne({
      where: {
        id
      }
    })
    if (!member) {
      return
    }
    let points = member.getDataValue('points')
    switch (type) {
      case 'increase':
        points += num
        break
      case 'decrease':
        points -= num
        break
      default:
        break
    }
    const result = await Member.update({ points }, {
      where: {
        id
      }
    })
    console.log(result)
    return result[0] > 0
  }
}

export default MemberService
