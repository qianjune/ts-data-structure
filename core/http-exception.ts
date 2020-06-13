/**
 * @description 错误类定义
 */

class HttpException extends Error {
  msg: string
  errorCode: number
  code: number
  constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = code
  }
}

class ParameterException extends HttpException {
  constructor(msg = '参数错误', errorCode = 10000) {
    super()
    this.code = 400
    this.msg = msg
    this.errorCode = errorCode
  }
}

class AuthFailed extends HttpException {
  constructor(msg = '授权失败', errorCode = 10004) {
    super()
    this.code = 401
    this.msg = msg
    this.errorCode = errorCode
  }
}
class Forbbiden extends HttpException {
  constructor(msg = '禁止访问', errorCode = 10006) {
    super()
    this.code = 403
    this.msg = msg
    this.errorCode = errorCode
  }
}
class Success extends HttpException {
  constructor(msg = 'success', errorCode = 0) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 201
  }
}
class HttpExceptionForMini extends Error {
  success: boolean
  error: string
  code: number
  constructor(error = '参数错误', code = 201) { // constructor 要设默认值，不然会返回0
    super()
    this.success = false
    this.error = error
    this.code = code
  }
}
// 小程序
class SuccessForMini extends HttpExceptionForMini {
  data: any
  constructor(msg: string, data: any) {
    super()
    this.success = true
    this.error = msg
    this.code = 201
    this.data = data
  }
}
class FailForMini extends HttpExceptionForMini {
  constructor(msg = '请求错误') {
    super()
    this.success = false
    this.error = msg
    this.code = 401
  }
}

export interface GlobalErrorInterface {
  HttpException: new (msg: string, errorCode?: number, code?: number) => HttpException;
  SuccessForMini: new (msg?: string, data?: any) => SuccessForMini;
  HttpExceptionForMini: new (data: any) => HttpExceptionForMini;
  FailForMini: new (msg?: string) => FailForMini;

}
const globalErrors = {
  HttpException,
  ParameterException,
  Success,
  AuthFailed,
  Forbbiden,
  SuccessForMini,
  HttpExceptionForMini,
  FailForMini
}
export default globalErrors