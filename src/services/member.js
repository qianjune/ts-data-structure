import { Member, User } from "../db/models"
import uuidv1 from 'uuid/v1'
/**
 * @description 会员 service
 * @author June
 */

class MemberService {
  /**
   * 创建会员
   * @param {*} data 
   */
  static async create(data) {
    const userId = data.userId
    const member = await User.findOne({
      where: {
        id:userId
      }
    })
    if (member === null) {
      return member
    }
    const memberCardCode = uuidv1()
    data.memberCardCode = memberCardCode
    const result = await Member.create(data)
    return result
  }
  /**
   * 更新成长值
   * @param {*} data 
   */
  static async updateGrowthValue(data) {
    const { num, type, userId } = data
    const member = await Member.findOne({
      where: {
        id: userId
      }
    })
    if (!member) {
      return
    }
    const growthValue = member.getDataValue('growthValue')
    switch (type) {
      case 'increase':
        growthValue += num
        break
      case 'increase':
        growthValue -= num
        break
      default:
        break
    }
    member.setDataValue('growthValue',growthValue)
    const result = member.update()
    return result
  }

   /**
   * 更新积分
   * @param {*} data 
   */
  static async updatePoints(data) {
    const { num, type, userId } = data
    const member = await Member.findOne({
      where: {
        id: userId
      }
    })
    if (!member) {
      return
    }
    const growthValue = member.getDataValue('points')
    switch (type) {
      case 'increase':
        growthValue += num
        break
      case 'increase':
        growthValue -= num
        break
      default:
        break
    }
    member.setDataValue('points',growthValue)
    const result = member.update()
    return result
  }
}

export {
  MemberService
}