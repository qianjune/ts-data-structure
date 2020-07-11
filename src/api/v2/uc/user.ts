/** 
 * @description user api 层
 */

import BaseRouter, { prefix, tag, post, summary, parameter } from "@src/lib/router-decorator";
import Joi from "@hapi/joi";
import UserService from "@src/services/user";
import { CODE_ACTION_TYPE, CODE_ACTION_PATH, CODE_PLATFORM } from "@src/enum";
import CodeManager from "@src/manager/code/code";
const codeManager = new CodeManager()
@prefix('/api/user')
@tag('用户服务')
class UserRouter extends BaseRouter {
  @post('/login/by/code')
  @summary('用户登录通过验证码')
  @parameter(Joi.object({
    user: Joi.string().length(11).required(),
    code: Joi.string().length(6).required()
  }), 'body')
  async loginForMini(ctx: any): Promise<any> {
    const { user, code } = ctx.request.body
    console.log(user, code)
    await UserService.login(user, code)
  }
  // 端 短信可以做成一个中间件拦截掉
  @post('/registerAndLogin/by/code')
  @summary('app手机短信一键注册登录')
  @parameter(Joi.object({
    user: Joi.string().length(11).required(),
    code: Joi.string().length(6).required()
  }), 'body')
  async registerAndLoginForApp(ctx: any): Promise<any> {
    const { user, code } = ctx.request.body
    // 首先验证验证码
    let result = await codeManager.validateCode({
      user, code, path: CODE_ACTION_PATH.MOBILE, type: CODE_ACTION_TYPE.REGISTER_AND_LOGIN, platform: CODE_PLATFORM.MINI
    })
    if (!result.success) {
      throw new global.errs.FailForMini(result.msg)
    }
    const model = 'session'
    result = await UserService.registerAndLoginForApp(user, model)
    if (model === 'session') {
      console.log('ctx.session:', ctx.session)
      // if (!ctx.session) {
      //   ctx.session = {}
      // }
      ctx.session.userInfo = (result as any).userInfo
      console.log('发送成功前', ctx.session.userInfo)
      // ctx.body = '登录成功'
      throw new global.errs.SuccessForMini('登录成功')
    } else {
      ctx.body = {
        data: {
          jwtToken: result
        }
      }
    }
  }
}

const userRouter = new UserRouter()
export default userRouter.init()