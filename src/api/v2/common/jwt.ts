/**
 * @description jwt 功能测试api
 */

import BaseRouter, { prefix, tag, post, summary, parameter, get } from "../../../lib/router-decorator";
import Joi from "@hapi/joi";
import JwtHandler from "../../../utils/jwt_handler";

@prefix('/api/jwt')
@tag('jwt功能测试')
class JwtRouter extends BaseRouter {
  @post('/sign')
  @summary('jwt加密')
  @parameter(Joi.object({
    data: Joi.object().required()
  }), 'body')
  async sign(ctx: any): Promise<void> {
    const { data } = ctx.request.body
    const result = await JwtHandler.encrypt(data)
    ctx.body = result
  }

  @post('/verify')
  @summary('jwt解密')
  @parameter(Joi.object({
    token: Joi.string().required()
  }), 'body')
  async verify(ctx: any): Promise<void> {
    const { token } = ctx.request.body
    const result = await JwtHandler.verify(token)
    ctx.body = result
  }

  @get('/verify/oauth2.0')
  @summary('jwt解密放在header')
  async verifyByHeader(ctx: any): Promise<void> {
    console.log(ctx.header)
    // const result = await JwtHandler.verify(token)
    ctx.body = ctx.header
  }
}

const jwtRouter = new JwtRouter()
export default jwtRouter.init()