/**
 * @description 品牌 api
 */

import BaseRouter, { prefix, tag, post, summary, middleware, parameter } from "@src/lib/router-decorator";
import { Context } from "koa";
import SessionCookieHandler from "@src/utils/session_cookie";
import Joi from "@hapi/joi";
import BrandService from "@src/services/v2/brand";
const brandService = new BrandService()
@prefix('/api/brand')
@tag('品牌相关服务')
class BrandRouter extends BaseRouter {
  @post('/create')
  @summary('品牌创建')
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      name: Joi.string().required(),
      desc: Joi.string(),
      logo: Joi.string()
    }), 'body'
  )
  async createBrand(ctx: Context) {
    const { body } = ctx.request
    await brandService.create(body)
  }
}

const brandRouter = new BrandRouter()
export default brandRouter.init()