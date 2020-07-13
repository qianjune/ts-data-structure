import BaseRouter, { prefix, tag, post, summary, parameter, middleware } from "@src/lib/router-decorator";
import Joi from "@hapi/joi";
import { Context } from "koa";
import ShopService from "@src/services/v2/shop";
import JwtHandler from "@src/utils/jwt_handler";
import SessionCookieHandler from "@src/utils/session_cookie";
const shopService = new ShopService()
@prefix('/api/shop')
@tag("店铺相关服务")
class ShopRouter extends BaseRouter {
  @post('/create')
  @summary('店铺创建')
  // @middleware(JwtHandler.loginCheck)
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(Joi.object({
    name: Joi.string().required()
  }), 'body')
  async createShop(ctx: Context): Promise<void> {
    const { body } = ctx.request
    await shopService.create(body)
  }
}

const shopRouter = new ShopRouter()
export default shopRouter.init()