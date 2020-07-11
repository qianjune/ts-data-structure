import {ManagerResponse} from '@src/manager/response'

class ResponseHandler{
  static send(result: ManagerResponse){
    if (result.success) {
      throw new global.errs.SuccessForMini(result.msg, result.data)
    }
    throw new global.errs.FailForMini(result.msg)
  }
}

export {
  ResponseHandler
}