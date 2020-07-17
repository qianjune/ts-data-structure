/**
 * @description 购物车api
 */

import BaseRouter, { prefix, tag, post, summary, middleware, parameter } from "@src/lib/router-decorator";
import { Context } from "koa";
import SessionCookieHandler from "@src/utils/session_cookie";
import Joi from "@hapi/joi";

@prefix('/api/shoppingCart')
@tag('购物车相关服务')
class ShoppingCart extends BaseRouter {
  @post('/add')
  @summary('产品加入购物车')
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      productId: Joi.number().required()
    }),
    'body'
  )
  async addProductToCart(ctx: Context) {
    const { parameter } = ctx.state
    
  }
}
const shoppingCart = new ShoppingCart()

export default shoppingCart.init()