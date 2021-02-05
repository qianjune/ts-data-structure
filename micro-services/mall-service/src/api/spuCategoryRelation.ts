/**
 * @description SpuCategoryRelation api
 */

import joi from "@hapi/joi";
import BaseRouter, {
  post,
  parameter,
  get,
  summary,
  del,
  prefix,
  tag,
  middleware,
} from "@src/lib/router-decorator";
import { Context } from "koa";
import SessionCookieHandler from "@src/utils/session_cookie";
import SpuCategoryRelationService from "../services/spuCategoryRelation";

const spuCategoryRelationService = new SpuCategoryRelationService();

@prefix("/api/spuCategoryRelation")
@tag("SpuCategoryRelation相关服务")
class SpuCategoryRelationApi extends BaseRouter {
  @post("/create")
  @summary("SpuCategoryRelation创建")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    joi.object({
      spuId: joi.number().required(),
      categoryId: joi.number().required(),
    }),
    "body"
  )
  async create(ctx: Context): Promise<void> {
    // create item
    const { body } = ctx.request;
    await spuCategoryRelationService.create(body);
  }
  @get("/detail/:id")
  @summary("SpuCategoryRelation详情")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async getInfo(ctx: Context): Promise<void> {
    // get info
    const { id } = ctx.state.parameter;
    await spuCategoryRelationService.getInfo(id);
  }
  @get("/list")
  @summary("SpuCategoryRelation列表")
  @parameter(
    joi.object({
      pageSize: joi.number().required(),
      pageNo: joi.number().required(),
      categoryId: joi.number().required(),
    }),
    "query"
  )
  async getList(ctx: Context): Promise<void> {
    // get list
    const { parameter } = ctx.state;
    await spuCategoryRelationService.getList(parameter);
  }
  @del("/:id")
  @summary("删除SpuCategoryRelation")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async del(ctx: Context): Promise<void> {
    // del item
    const { id } = ctx.state.parameter;
    await spuCategoryRelationService.del(id);
  }

  @post("/edit")
  @summary("SpuCategoryRelation编辑")
  @parameter(joi.object({}), "body")
  async edit(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    await spuCategoryRelationService.edit(body);
  }
}

export default new SpuCategoryRelationApi().init();
