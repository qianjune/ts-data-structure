/**
 * @description jwt 功能测试api
 */

import BaseRouter, {
  prefix,
  tag,
  post,
  summary,
  parameter,
  get,
  middleware,
} from "@src/lib/router-decorator";
import Joi from "joi";
import JwtHandler from "@src/utils/jwt_handler";
import { Context } from "koa";

@prefix("/api/jwt")
@tag("jwt功能测试")
class JwtRouter extends BaseRouter {
  @post("/sign")
  @summary("jwt加密")
  @parameter(
    Joi.object({
      data: Joi.object().required(),
    }),
    "body"
  )
  async sign(ctx: Context): Promise<void> {
    const { data } = ctx.request.body;
    const result = await JwtHandler.encrypt(data);
    ctx.set("authorization", result);
    ctx.body = {
      token: result,
    };
  }

  @post("/verify")
  @summary("jwt解密")
  @parameter(
    Joi.object({
      token: Joi.string().required(),
    }),
    "body"
  )
  async verify(ctx: Context): Promise<void> {
    const { token } = ctx.request.body;
    const result = await JwtHandler.verify(token);
    ctx.body = result;
  }

  @get("/verify/oauth2.0")
  @summary("jwt解密放在header")
  async verifyByHeader(ctx: Context): Promise<void> {
    console.log(ctx.header);
    // const result = await JwtHandler.verify(token)
    ctx.body = ctx.header;
  }
  @get("/validate/oauth2.0/middleware")
  @summary("检测jwt中间件是否有效")
  @middleware(JwtHandler.loginCheck)
  async validateJwtMiddleware(ctx: Context): Promise<void> {
    ctx.body = `jwt中间件通过,id:${global.state.userInfo.id}`;
  }
}

const jwtRouter = new JwtRouter();
export default jwtRouter.init();
