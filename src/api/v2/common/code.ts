/**
 * @description 验证码 api
 */

import BaseRouter, { prefix, tag, post, summary, parameter } from "../../../lib/router-decorator";
import Joi from "@hapi/joi";
import CodeService from "../../../services/code";

@prefix('/api/common')
@tag('验证码服务')
class CodeRouter extends BaseRouter {
  @post('/mobile/send/code')
  @summary('发送手机验证码')
  @parameter(Joi.object({
    user: Joi.string().length(11).required()
  }), 'body')
  async sendCodeForMobile(ctx: any): Promise<void> {
    const { user } = ctx.request.body
    await CodeService.sendCodeByMobile(user)
  }

  @post('/email/send/code')
  @summary('发送邮箱验证码')
  @parameter(Joi.object({
    user: Joi.string().email().required()
  }), 'body')
  async sendCodeForEmail(ctx: any): Promise<void> {
    const { user } = ctx.request.body
    await CodeService.sendCodeByEmail(user)
  }
  @post('/email/validate/code')
  @summary('验证邮箱验证码')
  @parameter(Joi.object({
    user: Joi.string().email().required(),
    code: Joi.string().required()
  }), 'body')
  async validateCodeForEmail(ctx: any): Promise<void> {
    const { user, code } = ctx.request.body
    await CodeService.validateCodeByEmail(user, code)
  }
}

const codeRouter = new CodeRouter()
export default codeRouter.init()