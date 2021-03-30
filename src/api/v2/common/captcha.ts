/**
 * @description 验证码 api
 */

import BaseRouter, {
  prefix,
  tag,
  get,
  summary,
  parameter,
} from "@src/lib/router-decorator";
import { Context } from "koa";
import svgCaptcha from "svg-captcha";
import { ResponseHandler } from "@src/utils/responseHandler";
import { ManagerResponseSuccess } from "@src/manager/response";
import Joi from "joi";
import { ValidateCodeModel } from "@root/cache/validateCode";

@prefix("/api/captcha")
@tag("图片验证码")
class CaptchaApi extends BaseRouter {
  @get("/svg")
  @summary("生成svg captcha")
  @parameter(
    Joi.object({
      user: Joi.string().required(),
      type: Joi.string().required(),
    }),
    "query"
  )
  async buildCaptcha(ctx: Context) {
    const { text, data } = svgCaptcha.create();
    const { user, type } = ctx.state.parameter;
    await ValidateCodeModel.saveCode({
      user,
      key: type + "-" + "captcha",
      code: text.toLowerCase(),
    });
    ResponseHandler.send(
      new ManagerResponseSuccess({ msg: "svg验证码", data })
    );
  }
}

const captchaApi = new CaptchaApi();
export default captchaApi.init();
