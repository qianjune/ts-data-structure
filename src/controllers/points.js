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
    // 要调用 成长值 增加,后面要用mq，防止失败
    const growthResult = MemberController.addGrowthValue({ userId: data.userId, num: data.num })
    if (growthResult.errno) {
      return growthResult
    }
    return new SuccessModel()
  }
  static async consumePoints(data) {

  }
}

export {
  PointsController
}