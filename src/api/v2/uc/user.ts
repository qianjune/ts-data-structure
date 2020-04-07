/** 
 * @description user api 层
 */

import BaseRouter, { prefix, tag, post, summary, parameter } from "../../../lib/router-decorator";
import { User } from "../../../db/models";
import Joi from "@hapi/joi";
import UserService from "../../../services/user";

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
    console.log(user,code)
    await UserService.login(user, code)
  }
}

const userRouter = new UserRouter()
export default userRouter.init()