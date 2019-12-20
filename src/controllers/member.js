import { MemberService } from "../services/member"
import { ErrorModel, SuccessModel } from "../../models/ResModel"
import ErrorInfo from "../../models/ErrorInfo"

/**
 * @description 会员 controller
 * @author June
 */

class MemberController {
  static async addNewMember(data) {
    const result = await MemberService.create(data)
    if (!result) {
      return ErrorModel(ErrorInfo.addMemberFailInfo)
    }
    return SuccessModel(result)
  }
  /**
   * 
   * @param {*} param0 num:增加的数值
   */
  static async addGrowthValue({ userId, num }) {
    const result = await MemberService.updateGrowthValue({
      userId,
      num,
      type: 'increase'
    })
    if(!result){
      return ErrorModel(ErrorInfo.addMemberGrowthValueInfo)
    }
    return SuccessModel(result)
  }
}

export {
  MemberController
}