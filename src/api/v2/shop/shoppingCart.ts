/**
 * @description 购物车api
 */

import BaseRouter, { prefix, tag, post, summary, middleware, parameter } from "@src/lib/router-decorator";
import { Context } from "koa";
import SessionCookieHandler from "@src/utils/session_cookie";
import Joi from "@hapi/joi";
import ShoppingCartService from "@src/services/v2/shoppingCart";
const shoppingCartService = new ShoppingCartService()
@prefix('/api/shoppingCart')
@tag('购物车相关服务')
class ShoppingCart extends BaseRouter {
  @post('/add')
  @summary('产品加入购物车')
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      productId: Joi.number().required(),
      sku: Joi.string().required(),
      num: Joi.number().required()
    }),
    'body'
  )
  async addProductToCart(ctx: Context) {
    const { parameter } = ctx.state
    console.log(parameter)
    console.log(global.state.userInfo)
    await shoppingCartService.create({ ...parameter, userId: global.state.userInfo.id })
  }
}
const shoppingCart = new ShoppingCart()

export default shoppingCart.init()