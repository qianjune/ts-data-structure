/**
 * @description 短信相关 api
 * @author June_end
 */
import Sms from "@micro-services/user-service/src/manager/sms";
import { UserController } from "@micro-services/user-service/src/manager/pre-user";
import joi from "@hapi/joi";
import Auth from "@root/middleware/auth";
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
import { EmailModel } from "@micro-services/user-service/src/manager/email";
import { Context } from "koa";

@prefix("/api/user/web")
@tag("用户-短信-服务")
class SmsRouter extends BaseRouter {
  @post("/email/test")
  async emailTest(ctx: Context): Promise<void> {
    // ctx.body = await EmailModel.sendEmail('418694294@qq.com', 'test')
  }

  // 忘记密码-发送短信验证码
  @post("/password/send-sms")
  @summary("忘记密码-发送短信验证码")
  @parameter(
    joi.object({
      mobile: joi.string().length(11).required(),
      captcha: joi.string(),
      token: joi.string(),
    }),
    "body"
  )
  async sendSmsCodeForForgetPassword(ctx: Context): Promise<void> {
    const { mobile } = ctx.request.body;
    // await Sms.sendSms(mobile, 'password')
  }

  @post("/password/reset-sms-code-verify")
  @summary("验证忘记密码收到的短信")
  @parameter(
    joi.object({
      mobile: joi.string().length(11).required(),
      smsCode: joi.number().required(),
    }),
    "body"
  )
  async verifySmsCodeForResetPassword(ctx: Context): Promise<void> {
    console.log("触发验证码");
    const { mobile, smsCode } = ctx.request.body;
    await UserController.verifySmsCode(mobile, smsCode);
  }

  // 登录发送手机验证码
  @post("/login/login-send-sms-code")
  @summary("登录发送手机验证码")
  @parameter(
    joi.object({
      mobile: joi.string().length(11).required(),
      captcha: joi.string(),
      prefix: joi.string(),
      token: joi.string(),
    }),
    "body"
  )
  async sendSmsCodeForLogin(ctx: Context): Promise<void> {
    const { mobile } = ctx.request.body;
    console.log("mobile", mobile);
    // await Sms.sendSms(mobile, 'login')
  }

  // 根据手机验证码登录
  @post("/login/login-by-sms-code")
  @summary("根据手机验证码登录")
  @parameter(
    joi.object({
      mobile: joi.string().length(11).required(),
      smsCode: joi.number().required(),
      isApp: joi.bool(),
      password: joi.string().allow(""),
      prefix: joi.string(),
    }),
    "body"
  )
  async loginBySmsCode(ctx: Context): Promise<void> {
    const { mobile, smsCode } = ctx.request.body;
    await UserController.mobileLogin(mobile, smsCode, "smsCode");
  }

  // 忘记密码-通过短信重置密码
  @post("/password/reset-by-sms-verify-token")
  @summary("忘记密码-通过短信重置密码")
  @parameter(
    joi.object({
      mobile: joi.string().length(11).required(),
      confirm: joi.string().required(),
      password: joi.string().required(),
      verifyToken: joi.string().required(),
    }),
    "body"
  )
  async resetPasswordBySmsCode(ctx: Context): Promise<void> {
    const { mobile, password, verifyToken } = ctx.request.body;
    console.log(mobile, password, verifyToken);
    // await UserController.editPassword(mobile, password, verifyToken, 'password')
  }

  // 密码混登接口
  @post("/login/identify")
  @summary("密码混登接口")
  @parameter(
    joi.object({
      identify: joi.string().required(),
      password: joi.string().required(),
      captcha: joi.string().allow(""),
      isApp: joi.bool(),
      prefix: joi.string(),
      token: joi.string().allow(""),
    }),
    "body"
  )
  async loginIdentify(ctx: Context): Promise<void> {
    const { identify, password } = ctx.request.body;
    await UserController.mobileLogin(identify, password, "password");
  }
}

// export default router
const smsRouter = new SmsRouter();
export default smsRouter.init();
