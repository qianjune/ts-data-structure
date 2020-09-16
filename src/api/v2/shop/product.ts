/**
 * @description 产品api
 */
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
      shopId: Joi.number(),
      mainImage: Joi.string(),
      skuGroup: Joi.array().items(Joi.any()).required(),
      desc: Joi.string(),
      belong: Joi.number().required()
    })
    , 'body'
  )
  async createProduct(ctx: Context): Promise<void> {
    const { body } = ctx.request
    console.log(body)
    const cloneData = { ...body }
    if (!cloneData.shopId) {
      cloneData.shopId = 1
    }
    await productService.create(cloneData)
  }

  @get('/list')
  @summary('产品列表')
  @parameter(Joi.object({
    pageSize: Joi.number().required(),
    pageNo: Joi.number().required(),
    shopId: Joi.number()
  }), 'query')
  async getList(ctx: Context): Promise<void> {
    await productService.getList(ctx.state.parameter)
  }
  @get('/app/list')
  @summary('app产品列表')
  @parameter(Joi.object({
    pageSize: Joi.number().required(),
    pageNo: Joi.number().required(),
    shopId: Joi.number()
  }), 'query')
  async getListForApp(ctx: Context): Promise<void> {
    await productService.getListForApp(ctx.state.parameter)
  }


  @get('/recommend/:categoryId/list')
  @summary('推荐分类产品列表')
  @parameter(Joi.object({
    categoryId: Joi.number().required()
  }), 'params')
  async getCategoryGoodsList(ctx: Context) {
    const { categoryId } = ctx.state.parameter
    console.log(categoryId);
    await productService.getListForApp({ belong: categoryId })
  }

  @get('/app/detail/:id')
  @summary('app商品详情')
  @parameter(Joi.object({
    id: Joi.string().required()
  }), 'params')
  async getInfoById(ctx: Context) {
    const { id } = ctx.state.parameter
    await productService.getInfo(id)
  }

  // 商品简化信息
}

const productRouter = new ProductRouter()
export default productRouter.init()