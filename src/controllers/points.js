import { ErrorModel, SuccessModel } from "../../models/ResModel"
import ErrorInfo from "../../models/ErrorInfo"
import { PointsService } from "../services/points"
import { MemberController } from "./member"

/**
 * @description 积分 controller
 * @author June
 */

class PointsController {
  static async addPoints(data) {
    const result = await PointsService.createNewPointsRecording(data)
    if (result === null) {
      return new ErrorModel(ErrorInfo.addPointsFailInfo)
    }
    // 新增积分条后，要调用增加用户的积分和成长值,后面要用mq，防止失败
    const memberResult = MemberController.addGrowthValueAndPoints({ userId: data.userId, num: data.num })
    if (memberResult.errno) {
      return memberResult
    }
    return new SuccessModel()
  }
  static async consumePoints(data) {

  }
}

export {
  PointsController
}