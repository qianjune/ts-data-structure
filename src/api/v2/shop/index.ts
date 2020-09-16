import BaseRouter, { prefix, tag, post, summary, parameter, middleware, get } from "@src/lib/router-decorator";
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
    console.log(ctx.session, 'ctx.session')
    console.log(global.state, 'global.state')
    await shopService.create(body)
  }
  @get('/list')
  @summary('产品列表')
  @parameter(Joi.object({
    pageSize: Joi.number().required(),
    pageNo: Joi.number().required(),
  }), 'query')
  async getList(ctx: Context) {
    await shopService.getList(ctx.state.parameter)
  }
  @get('/detail/:id')
  @summary('app商品详情')
  @parameter(Joi.object({
    id: Joi.string().required()
  }), 'params')
  async getInfoById(ctx: Context) {
    const { id } = ctx.state.parameter
    await shopService.getInfo(id)
  }
}

const shopRouter = new ShopRouter()
export default shopRouter.init()