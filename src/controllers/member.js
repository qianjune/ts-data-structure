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
  static async addGrowthValueAndPoints({ userId, num }) {
    const growthValueResult = await MemberService.updateGrowthValue({
      userId,
      num,
      type: 'increase'
    })
    const pointsResult = await MemberService.updatePoints({
      userId,
      num,
      type: 'increase'
    })
    console.log(growthValueResult)
    console.log(pointsResult)
    // if(!result){
    //   return ErrorModel(ErrorInfo.addMemberGrowthValueInfo)
    // }
    // return SuccessModel(result)
  }
}

export {
  MemberController
}