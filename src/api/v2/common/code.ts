/**
 * @description 验证码 api
 */

import BaseRouter, { prefix, tag, post, summary, parameter } from "../../../lib/router-decorator";
import Joi from "@hapi/joi";
import CodeService from "../../../services/code";
import { CODE_ACTION_TYPE } from "../../../enum";

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
    await CodeService.sendCodeByMobile(user, CODE_ACTION_TYPE.REGISTER)
  }
  @post('/mobile/validate/code')
  @summary('验证手机验证码')
  @parameter(Joi.object({
    user: Joi.string().length(11).required(),
    code: Joi.string().required()
  }), 'body')
  async validateCodeForMobile(ctx: any): Promise<void> {
    const { user, code } = ctx.request.body
    await CodeService.validateCodeByMobile(user, CODE_ACTION_TYPE.REGISTER, code)
  }

  // 手机一键登录
  @post('/mobile/send/code/one-click-login')
  @summary('发送一键登录手机验证码')
  @parameter(Joi.object({
    user: Joi.string().length(11).required()
  }), 'body')
  async sendCodeForOnClickLoginByMobile(ctx: any): Promise<void> {
    const { user } = ctx.request.body
    await CodeService.sendCodeByMobile(user, CODE_ACTION_TYPE.REGISTER_AND_LOGIN)
  }
  @post('/mobile/validate/one-click-login')
  @summary('验证一键登录手机验证码')
  @parameter(Joi.object({
    user: Joi.string().length(11).required(),
    code: Joi.string().required()
  }), 'body')
  async validateCodeForOnClickLoginByMobile(ctx: any): Promise<void> {
    const { user, code } = ctx.request.body
    await CodeService.validateCodeByMobile(user, CODE_ACTION_TYPE.REGISTER_AND_LOGIN, code)
  }
  // end

  @post('/email/send/code')
  @summary('发送邮箱验证码')
  @parameter(Joi.object({
    user: Joi.string().email().required()
  }), 'body')
  async sendCodeForEmail(ctx: any): Promise<void> {
    const { user } = ctx.request.body
    await CodeService.sendCodeByEmail(user, CODE_ACTION_TYPE.REGISTER)
  }
  @post('/email/validate/code')
  @summary('验证邮箱验证码')
  @parameter(Joi.object({
    user: Joi.string().email().required(),
    code: Joi.string().required()
  }), 'body')
  async validateCodeForEmail(ctx: any): Promise<void> {
    const { user, code } = ctx.request.body
    await CodeService.validateCodeByEmail(user, CODE_ACTION_TYPE.REGISTER, code)
  }
}

const codeRouter = new CodeRouter()
export default codeRouter.init()