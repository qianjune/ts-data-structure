import { MemberService } from "@src/services/member"
import { ErrorModel, SuccessModel } from "@root/models/ResModel"
import ErrorInfo from "@root/models/ErrorInfo"

/**
 * @description 会员 controller
 * @author June
 */

class MemberController {
  static async addNewMember(data) {
    const result = await MemberService.create(data)
    if (!result) {
      return new ErrorModel(ErrorInfo.addMemberFailInfo)
    }
    return new SuccessModel(result)
  }
  /**
   * 
   * @param {*} param0 num:增加的数值
   */
  static async addGrowthValueAndPoints({ id, num }) {
    console.log('memberId', id)
    const growthValueResult = await MemberService.updateGrowthValue({
      id,
      num,
      type: 'increase'
    })
    const pointsResult = await MemberService.updatePoints({
      id,
      num,
      type: 'increase'
    })
    if (growthValueResult && pointsResult) {
      return new SuccessModel()
    }
    return new ErrorModel(ErrorInfo.addMemberGrowthValueInfo)
    // if(!result){
    //   return ErrorModel(ErrorInfo.addMemberGrowthValueInfo)
    // }
    // return SuccessModel(result)
  }
}

export {
  MemberController
}