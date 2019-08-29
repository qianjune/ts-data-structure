class HttpException extends Error {
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
  constructor(msg, errorCode) {
    super()
    this.code = 401
    this.msg = msg || '授权失败'
    this.errorCode = errorCode || 10004
  }
}
class Forbbiden extends HttpException{
  constructor(msg,errorCode){
    super()
    this.code = 403
    this.msg = msg || '禁止访问'
    this.errorCode = errorCode || 10006
  }
}
class Success extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || 'success'
    this.errorCode = errorCode || 0
    this.code = 201
  }
}

module.exports = {
  HttpException,
  ParameterException,
  Success,
  AuthFailed,
  Forbbiden
}