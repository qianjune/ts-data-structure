/**
 * @description 邮箱相关
 */

import Joi from "@hapi/joi";
import { CODE_ACTION_TYPE } from "@src/enum/code/codeActionType";
import BaseRouter, {
  get,
  post,
  middleware,
  parameter,
  prefix,
  put,
  summary,
  tag,
} from "@src/lib/router-decorator";
import SessionCookieHandler from "@src/utils/session_cookie";
import { Context } from "koa";
import EmailService from "../services/email";
const emailService = new EmailService();

@prefix("/api/user/email")
@tag("用户中心-邮箱服务")
class EmailRouter extends BaseRouter {
  @post("/bind")
  @summary("绑定邮箱")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      token: Joi.string().required(),
      code: Joi.string().required(),
      email: Joi.string().required(),
    }),
    "body"
  )
  async bindEmail(ctx: Context) {
    await emailService.bind({
      ...ctx.request.body,
      userInfo: global.state.userInfo,
    });
  }

  @post("/unbind")
  @summary("解绑邮箱")
  @middleware(SessionCookieHandler.loginCheck)
  async unbindEmail(ctx: Context) { }

  @post("/code/send/bind")
  @summary("发送邮箱验证码用于邮箱绑定")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      email: Joi.string().required(),
    }),
    "body"
  )
  async sendCodeForBindEmail(ctx: Context) {
    const { body } = ctx.request;
    await emailService.sendCode({
      email: body.email,
      type: CODE_ACTION_TYPE.BIND,
    });
  }

  @post("/code/send")
  @summary("发送邮箱验证码")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(Joi.object({}), "body")
  async sendCode(ctx: Context) {
    await emailService.sendCode({
      email: global.state.userInfo.email,
      type: CODE_ACTION_TYPE.COMMON,
    });
  }

  @post("/code/validate")
  @summary("验证邮箱验证码")
  @middleware(SessionCookieHandler.loginCheck)
  async validateCode(ctx: Context) { }

  @post("/reset")
  @summary("重置邮箱")
  @middleware(SessionCookieHandler.loginCheck)
  async resetEmail(ctx: Context) { }
}

const emailRouter = new EmailRouter();
export default emailRouter.init();
