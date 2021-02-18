/**
 * @description 手机相关
 */

import Joi from "@hapi/joi";
import { CODE_ACTION_TYPE } from "@src/enum";
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
import MobileService from "../services/mobile";
const mobileService = new MobileService();

@prefix("/api/user/mobile")
@tag("用户中心-手机服务")
class MobileRouter extends BaseRouter {
  @post("/bind")
  @summary("绑定手机")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      token: Joi.string().required(),
      code: Joi.string().required(),
      mobile: Joi.string().required(),
    }),
    "body"
  )
  async bindMobile(ctx: Context) {
    await mobileService.bind({
      ...ctx.request.body,
      userInfo: global.state.userInfo,
    });
  }

  @post("/unbind")
  @summary("解绑手机")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      token: Joi.string().required(),
      code: Joi.string().required(),
    }),
    "body"
  )
  async unbindMobile(ctx: Context) {
    await mobileService.unbind({
      ...ctx.request.body,
      userInfo: global.state.userInfo,
    });
  }

  @post("/code/send/bind")
  @summary("发送手机验证码用于手机-绑定")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      mobile: Joi.string().required(),
    }),
    "body"
  )
  async sendCodeForBindMobile(ctx: Context) {
    const { body } = ctx.request;
    await mobileService.sendCode({
      mobile: body.mobile,
      type: CODE_ACTION_TYPE.BIND,
    });
  }

  @post("/code/send/unbind")
  @summary("发送手机验证码用于手机-解绑")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(Joi.object({}), "body")
  async sendCodeForUnbindMobile(ctx: Context) {
    console.log(global.state.userInfo);
    await mobileService.sendCode({
      mobile: global.state.userInfo.mobile,
      type: CODE_ACTION_TYPE.UNBIND,
    });
  }

  @post("/code/send")
  @summary("发送手机验证码")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(Joi.object({}), "body")
  async sendCode(ctx: Context) {
    await mobileService.sendCode({
      mobile: global.state.userInfo.mobile,
      type: CODE_ACTION_TYPE.COMMON,
    });
  }

  @post("/code/validate")
  @summary("验证手机验证码")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      mobile: Joi.string().required(),
      token: Joi.string().required(),
      code: Joi.string().required(),
    }),
    "body"
  )
  async validateCode(ctx: Context) {
    await mobileService.validateCode({
      ...ctx.request.body,
    });
  }

  @post("/reset")
  @summary("重置手机")
  @middleware(SessionCookieHandler.loginCheck)
  async resetMobile(ctx: Context) {
    // 重置和解绑的区别在于，解绑要用手机验证，重置用手机或者账号密码
  }
}

const mobileRouter = new MobileRouter();
export default mobileRouter.init();
