import { ManagerResponse } from '@src/manager/response'

class ResponseHandler {
  static send(result: ManagerResponse, config?: { session: any }): void {
    const { session = '' } = config || {}
    if (result.success) {
      if (session) {
        throw new global.errs.SuccessForMini(result.msg, result.data, session)

      } else {
        throw new global.errs.SuccessForMini(result.msg, result.data)
      }
    }
    throw new global.errs.FailForMini(result.msg)
  }
}

export {
  ResponseHandler
}