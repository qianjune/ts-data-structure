import { ErrorModel, SuccessModel } from "@root/models/ResModel"
import ErrorInfo from "@root/models/ErrorInfo"
import { PointsService } from "@src/services/member/points"
import { MemberController } from "@src/manager/v2/member"
import { PointsEnum } from "@src/enum"

/**
 * @description 积分 controller
 * @author June
 */

class PointsController {
  static async addPoints(data) {
    if (!PointsEnum.isThisEnum(data.pattern)) {
      return new ErrorModel(ErrorInfo.pointsPatternInvalid)
    }
    const result = await PointsService.createNewPointsRecording(data)
    if (result === null) {
      return new ErrorModel(ErrorInfo.addPointsFailInfo)
    }
    // 新增积分条后，要调用增加用户的积分和成长值,后面要用mq，防止失败
    const memberResult = await MemberController.addGrowthValueAndPoints({ id: data.memberId, num: data.num })

    if (memberResult.errno) {
      return new ErrorModel(ErrorInfo.addMemberGrowthValueInfo)
    }
    return new SuccessModel()
  }
  static async consumePoints(data) {

  }
}

export {
  PointsController
}