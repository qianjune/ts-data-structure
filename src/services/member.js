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
    const { userId } = data
    const member = await User.findOne({
      where: {
        id: userId
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
    const { num, type, id } = data
    console.log('开始更新成长值')
    const member = await Member.findOne({
      where: {
        id
      }
    })
    if (!member) {
      return
    }
    let growthValue = member.getDataValue('growthValue')
    switch (type) {
      case 'increase':
        growthValue += num
        break
      case 'decrease':
        growthValue -= num
        break
      default:
        break
    }
    const result = await Member.update({ growthValue }, {
      where: {
        id
      }
    })
    console.log(result)
    return result[0] > 0
  }

  /**
  * 更新积分
  * @param {*} data 
  */
  static async updatePoints(data) {
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

export {
  MemberService
}