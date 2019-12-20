import { Member, User } from "../db/models"
import uuidv1 from 'uuid/v1'
/**
 * @description 会员 service
 * @author June
 */

class MemberService {
  static async create(data) {
    const userId = data.userId
    const member = await User.findOne({
      where: {
        userId
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
  static async updateGrowthValue(data) {
    const { num, type, userId } = this.data
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
  }
}

export {
  MemberService
}