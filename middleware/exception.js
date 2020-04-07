import globalErrors from '../core/http-exception'
const { HttpException, HttpExceptionForMini } = globalErrors

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    const isHttpException = error instanceof HttpException
    const isDev = global.config.environment === 'dev'

    if (isDev && !isHttpException) {

      console.log(error)
    }
    // 普通Error也可以用一个统一的格式处理下
    if (isHttpException) {
      ctx.body = {
        msg: error.msg,
        error: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    }
    // 小程序
    if (error instanceof HttpExceptionForMini) {
      console.log(error)
      const result = {
        success: error.success,
      }
      if (error.error) {
        result.error = error.error
      }
      if (error.data) {
        result.result = error.data
      }
      ctx.body = result
      ctx.status = error.code
    }

  }
}

export default catchError