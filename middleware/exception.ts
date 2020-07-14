import globalErrors from '../core/http-exception'
import { Context } from 'koa'
const { HttpException, HttpExceptionForMini } = globalErrors

const catchError = async (ctx: Context, next: any): Promise<void> => {
  try {
    await next()
  } catch (error) {
    const isHttpException = error instanceof HttpException
    const isHttpExceptionForMini = error instanceof HttpExceptionForMini

    const isDev = global.config.environment === 'dev'
    console.log(error)
    if (isDev && !isHttpException && !isHttpExceptionForMini) {

      // console.log(error)
      console.log('意外错误')
      ctx.status = 500
      ctx.body = {
        success: false,
        msg: '意外错误',
        data: error
      }
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
    if (isHttpExceptionForMini) {
      const result: { [keyname: string]: any } = {
        success: error.success,
      }
      if (error.msg) {
        result.msg = error.msg
      }
      if (error.data) {
        result.data = error.data
      }

      if (error.session && (ctx.session.userInfo === null || ctx.session.userInfo === undefined)) {
        ctx.session.userInfo = error.session
      }
      ctx.body = result
      ctx.status = error.code
    }

  }
}

export default catchError