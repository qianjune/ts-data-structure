import BaseRouter, { prefix, tag, post, summary, middleware, parameter, get, del } from "@src/lib/router-decorator";
import { Context } from "koa";
import SessionCookieHandler from "@src/utils/session_cookie";
import Joi from "@hapi/joi";
import AttributeService from "@src/services/v2/attribute";
const attributeService = new AttributeService()

@prefix('/api/attribute')
@tag('属性相关服务')
class AttributeRouter extends BaseRouter {
  @post('/create')
  @summary('属性创建')
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      key: Joi.string().required(),
      values: Joi.array().items(Joi.string(), Joi.number())
    }), 'body'
  )
  async createAttribute(ctx: Context) {
    const { body } = ctx.request
    await attributeService.create(body)
  }

  @get('/list')
  @summary('品牌列表')
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(Joi.object({
    pageSize: Joi.number().required(),
    pageNo: Joi.number().required(),
  }), 'query')
  async getList(ctx: Context) {
    const { parameter } = ctx.state
    await attributeService.getList(parameter)
  }

  @del('/del')
  @summary('品牌列表')
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(Joi.object({
    id: Joi.allow(Joi.string(), Joi.number())
  }), 'query')
  async del(ctx: Context) {
    const { parameter } = ctx.state
    await attributeService.del(parameter.id)
  }
}
const attributeRouter = new AttributeRouter()
export default attributeRouter.init()