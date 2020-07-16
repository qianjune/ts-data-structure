import BaseRouter, { tag, prefix, post, summary, middleware, parameter, get } from "@src/lib/router-decorator";
import { Context } from "koa";
import SessionCookieHandler from "@src/utils/session_cookie";
import Joi from "@hapi/joi";
import ProductService from "@src/services/v2/product";
const productService = new ProductService()
@prefix('/api/product')
@tag('产品相关服务')
class ProductRouter extends BaseRouter {
  @post('/create')
  @summary('产品创建')
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      name: Joi.string().required(),
      shopId: Joi.number().required()
    })
    , 'body'
  )
  async createProduct(ctx: Context) {
    const { body } = ctx.request
    await productService.create(body)
  }

  @get('/list')
  @summary('产品列表')
  @parameter(Joi.object({
    pageSize: Joi.number().required(),
    pageNo: Joi.number().required(),
    shopId: Joi.number().required()
  }), 'query')
  async getList(ctx: Context) {
    // ctx.body = ctx.request.query
    console.log('--------------------')
    // // const { query } = ctx.request
    // const query = 
    console.log(ctx.state.parameter)
    // ctx.body=query
    // await productService.getList(query)
  }
}

const productRouter = new ProductRouter()
export default productRouter.init()