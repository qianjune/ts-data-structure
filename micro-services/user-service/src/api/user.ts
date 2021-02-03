/**
 * @description user api 层
 */

import BaseRouter, {
  prefix,
  tag,
  post,
  summary,
  parameter,
  middleware,
  get,
} from "@src/lib/router-decorator";
import Joi from "@hapi/joi";
import UserService from "@micro-services/user-service/src/services/user";
import { CODE_ACTION_TYPE, CODE_ACTION_PATH, CODE_PLATFORM } from "@src/enum";
import CodeManager from "@src/manager/code/code";
import { Context } from "koa";
import SessionCookieHandler from "@src/utils/session_cookie";
const userService = new UserService();
const codeManager = new CodeManager();
@prefix("/api/user")
@tag("用户服务")
class UserRouter extends BaseRouter {
  @post("/reset/password")
  @summary("重置用户密码")
  @parameter(
    Joi.object({
      user: Joi.string().length(11).required(),
      code: Joi.string().length(6).required(),
      password: Joi.string().required(),
    }),
    "body"
  )
  @middleware(SessionCookieHandler.loginCheck)
  async resetPassword(ctx: Context): Promise<any> {
    const { user, code, password } = ctx.request.body;
    const { id } = global.state.userInfo;
    console.log(user, code);
    const data = {
      id,
      password,
      code,
      user,
      type: CODE_ACTION_TYPE.RESET_PASSWORD,
    };
    await userService.edit(data);
  }

  @get("/list")
  @summary("获取用户列表")
  @parameter(
    Joi.object({
      pageSize: Joi.number().required(),
      pageNo: Joi.number().required(),
    }),
    "query"
  )
  @middleware(SessionCookieHandler.loginCheck)
  async getUserList(ctx: Context): Promise<any> {
    await userService.getList(ctx.state.parameter);
  }

  @post("/login/by/code")
  @summary("用户登录通过验证码")
  @parameter(
    Joi.object({
      user: Joi.string().length(11).required(),
      code: Joi.string().length(6).required(),
    }),
    "body"
  )
  async loginForMini(ctx: Context): Promise<any> {
    const { user, code } = ctx.request.body;
    console.log(user, code);
    await UserService.login(user, code);
  }
  // 端 短信可以做成一个中间件拦截掉
  @post("/registerAndLogin/by/code")
  @summary("app手机短信一键注册登录")
  @parameter(
    Joi.object({
      user: Joi.string().length(11).required(),
      code: Joi.string().length(6).required(),
    }),
    "body"
  )
  async registerAndLoginForApp(ctx: Context): Promise<any> {
    const { user, code } = ctx.request.body;
    // 首先验证验证码
    let result = await codeManager.validateCode({
      user,
      code,
      path: CODE_ACTION_PATH.MOBILE,
      type: CODE_ACTION_TYPE.REGISTER_AND_LOGIN,
      platform: CODE_PLATFORM.MINI,
    });
    if (!result.success) {
      throw new global.errs.FailForMini(result.msg);
    }
    const model = "session";
    result = await UserService.registerAndLoginForApp(user, model);
    if (model === "session") {
      console.log("ctx.session:", ctx.session);
      // if (!ctx.session) {
      //   ctx.session = {}
      // }
      ctx.session.userInfo = (result as any).userInfo;
      // ctx.body = '登录成功'
      throw new global.errs.SuccessForMini("登录成功");
    } else {
      ctx.body = {
        data: {
          jwtToken: result,
        },
      };
    }
  }

  // @parameter(Joi.object({

  // }),'body')
  // async modifyPasswordByOld(){
  //   return
  // }
}

const userRouter = new UserRouter();
export default userRouter.init();
