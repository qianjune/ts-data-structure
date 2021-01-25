import { ManagerResponse } from "@src/manager/response";

class ResponseHandler {
  static send(result: ManagerResponse<any>, config?: { session: any }): void {
    const { session = "" } = config || {};
    if (result.success) {
      if (session) {
        throw new global.errs.SuccessForMini(result.msg, result.data, session);
      } else {
        console.log("result");
        console.log(result);
        const successError = new global.errs.SuccessForMini(
          result.msg,
          result.data
        );
        console.log(successError);
        throw successError;
      }
    }
    throw new global.errs.FailForMini(result.msg);
  }
}

export { ResponseHandler };
