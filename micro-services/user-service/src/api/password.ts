/**
 * @description 密码相关
 */

import Joi from "joi";
import { CODE_ACTION_PATH } from "@src/enum";
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
import PasswordService from "../services/password";
const passwordService = new PasswordService();

@prefix("/api/user/password")
@tag("用户中心-密码服务")
class PasswordRouter extends BaseRouter {
  @post("/bind")
  @summary("设置密码")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      token: Joi.string().required(),
      code: Joi.string().required(),
      password: Joi.string().required(),
    }),
    "body"
  )
  async bindPassword(ctx: Context) {
    await passwordService.bind({
      ...ctx.request.body,
      userInfo: global.state.userInfo,
    });
  }

  @post("/modify/by/old")
  @summary("修改密码-通过老密码")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      oldPassword: Joi.string().required(),
      password: Joi.string().required(),
    }),
    "body"
  )
  async modifyPasswordByOldPassword(ctx: Context) {
    await passwordService.modify({
      ...ctx.request.body,
      userInfo: global.state.userInfo,
    });
  }

  @post("/modify/by/code")
  @summary("修改密码-通过验证码")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      token: Joi.string().required(),
      code: Joi.string().required(),
      password: Joi.string().required(),
    }),
    "body"
  )
  async modifyPasswordByCode(ctx: Context) {
    await passwordService.modify({
      ...ctx.request.body,
      userInfo: global.state.userInfo,
    });
  }

  // @post("/code/send/bind")
  // @summary("发送密码验证码用于密码-设置")
  // @middleware(SessionCookieHandler.loginCheck)
  // @parameter(Joi.object({}), "body")
  // async sendCodeForBindPassword(ctx: Context) {
  //   await passwordService.sendCode({
  //     ...global.state.userInfo,
  //     type: CODE_ACTION_TYPE.BIND,
  //   });
  // }

  @post("/code/send/for/modify/by/mobile")
  @summary("发送手机验证码用于密码-修改")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(Joi.object({}), "body")
  async sendCodeForModifyPasswordByMobile(ctx: Context) {
    console.log(global.state.userInfo);
    await passwordService.sendCode({
      userInfo: global.state.userInfo,
      type: CODE_ACTION_TYPE.EDIT_PASSWORD,
      path: CODE_ACTION_PATH.MOBILE,
    });
  }

  @post("/code/send/for/modify/by/email")
  @summary("发送邮箱证码用于密码-修改")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(Joi.object({}), "body")
  async sendCodeForModifyPasswordByEmail(ctx: Context) {
    console.log(global.state.userInfo);
    await passwordService.sendCode({
      userInfo: global.state.userInfo,
      type: CODE_ACTION_TYPE.EDIT_PASSWORD,
      path: CODE_ACTION_PATH.EMAIL,
    });
  }

  @post("/reset")
  @summary("重置密码")
  @middleware(SessionCookieHandler.loginCheck)
  async resetPassword(ctx: Context) {
    // 重置和解绑的区别在于，解绑要用密码验证，重置用手机或者账号密码
  }
}

const passwordRouter = new PasswordRouter();
export default passwordRouter.init();
