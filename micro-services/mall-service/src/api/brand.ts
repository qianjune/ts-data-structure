/**
 * @description 品牌 api
 */

import BaseRouter, {
  prefix,
  tag,
  post,
  summary,
  middleware,
  parameter,
  get,
} from "@src/lib/router-decorator";
import { Context } from "koa";
import SessionCookieHandler from "@src/utils/session_cookie";
import Joi from "@hapi/joi";
import BrandService from "../services/brand";
const brandService = new BrandService();
@prefix("/api/brand")
@tag("品牌相关服务")
class BrandRouter extends BaseRouter {
  @post("/create")
  @summary("品牌创建")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      name: Joi.string().required(),
      desc: Joi.string(),
      logo: Joi.string(),
      shopId: Joi.number(),
    }),
    "body"
  )
  async createBrand(ctx: Context) {
    const { body } = ctx.request;
    await brandService.create(body);
  }

  @get("/list")
  @summary("品牌列表")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      pageSize: Joi.number().required(),
      pageNo: Joi.number().required(),
    }),
    "query"
  )
  async getList(ctx: Context) {
    const { parameter } = ctx.state;
    await brandService.getList(parameter);
  }
}

const brandRouter = new BrandRouter();
export default brandRouter.init();
