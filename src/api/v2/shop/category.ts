/**
 * @description 分类 相关接口
 */

import BaseRouter, { get, prefix, tag, post, summary, middleware, parameter } from "@src/lib/router-decorator";
import { Context } from "koa";
import CategoryService from "@src/services/v2/category";
import SessionCookieHandler from "@src/utils/session_cookie";
import Joi from "@hapi/joi";
const categoryService = new CategoryService()
@prefix('/api/category')
@tag('分类相关服务')
class CategoryRouter extends BaseRouter {
  @post('/create')
  @summary('分类创建')
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      name: Joi.string().required(),
      parentId: Joi.number()
    }),
    'body'
  )
  async createCategory(ctx: Context): Promise<void> {
    const { body } = ctx.request
    await categoryService.create(body)
  }
  @get('/list')
  @summary('分类列表')
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      pageSize: Joi.number().required(),
      pageNo: Joi.number().required(),
      parentId: Joi.number()
    }),
    'query'
  )
  async getList(ctx: Context) {
    const { parameter } = ctx.state
    await categoryService.getList(parameter)
  }
  @post('/del')
  @summary('删除分类')
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      id: Joi.number().required()
    }),
    'body'
  )
  async delCategory(ctx: Context): Promise<void> {
    const { body } = ctx.request
    await categoryService.del(body.id)
  }
}

const categoryRouter = new CategoryRouter
export default categoryRouter.init()