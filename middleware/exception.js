import { HttpException } from '../core/http-exception'

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
  }
}

export default catchError