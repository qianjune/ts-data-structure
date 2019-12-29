import { ErrorModel,SuccessModel } from "../../models/ResModel"
import ErrorInfo from "../../models/ErrorInfo"

/**
 * @description 权益 controller
 * @author June
 */

class RightController {
  static async createRight(data){
    const result = await RightService.createRight(data)
    if (!result) {
      return new ErrorModel(ErrorInfo.createRightFailInfo)
    }
    return new SuccessModel(result)
  }
  static async editRight(data){
    const result = await RightService.editRight(data)
    if (!result) {
      return new ErrorModel(ErrorInfo.editRightFailInfo)
    }
    return new SuccessModel(result)
  }
  static async createRightPackage(data){
    const result = await RightService.createPackage(data)
    if (!result) {
      return new ErrorModel(ErrorInfo.createRightPackageFailInfo)
    }
    return new SuccessModel(result)
  }
  static async editRightPackage(data){
    const result = await RightService.editPackage(data)
    if (!result) {
      return new ErrorModel(ErrorInfo.editRightPackageFailInfo)
    }
    return new SuccessModel(result)
  }
}

export {
  RightController
}