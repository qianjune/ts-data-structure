/** 
 * @description user api 层
 */

import BaseRouter, { prefix, tag, post, summary, parameter } from "../../../lib/router-decorator";
import Joi from "@hapi/joi";
import UserService from "../../../services/user";
import CodeService from "../../../services/code";
import { CODE_ACTION_TYPE } from "../../../enum";

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
    const result = await CodeService.validateCodeByMobile(user,CODE_ACTION_TYPE.REGISTER,code)
    // 首先验证验证码
    await UserService.registerAndLoginForApp(user)
  }
}

const userRouter = new UserRouter()
export default userRouter.init()