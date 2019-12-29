import ErrorInfo from "../../models/ErrorInfo"
import { ErrorModel, SuccessModel } from "../../models/ResModel"

class levelController {
  static async createLevel(data){
    const result = await LevelService.create(data)
    if (!result) {
      return new ErrorModel(ErrorInfo.createLevelFailInfo)
    }
    return new SuccessModel(result)
  }
  static async editLevel(data){
    const result = await LevelService.edit(data)
    if (!result) {
      return new ErrorModel(ErrorInfo.editLevelFailInfo)
    }
    return new SuccessModel(result)
  }
}

export {
  levelController
}