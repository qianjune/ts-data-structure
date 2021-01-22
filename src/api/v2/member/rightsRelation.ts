/**
 * @description RightsRelation api
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
} from "@src/lib/router-decorator";
import { Context } from "koa";
import RightsRelationService from "@src/services/v2/rightsRelation";
const rightsRelationService = new RightsRelationService();
@prefix("/api/rightsRelation")
@tag("RightsRelation相关服务")
class RightsRelationApi extends BaseRouter {
  @post("/create")
  @summary("RightsRelation创建")
  @parameter(
    joi.object({
      packageId: joi.number().required(),
      rightId: joi.number().required(),
      amount: joi.number(),
    }),
    "body"
  )
  async create(ctx: Context): Promise<void> {
    // create item
    const { body } = ctx.request;
    await rightsRelationService.create(body);
  }
  @get("/detail/:id")
  @summary("RightsRelation详情")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async getInfo(ctx: Context): Promise<void> {
    // get info
    const { id } = ctx.state.parameter;
    await rightsRelationService.getInfo(id);
  }
  @get("/list")
  @summary("RightsRelation列表")
  @parameter(
    joi.object({
      pageSize: joi.number().required(),
      pageNo: joi.number().required(),
    }),
    "query"
  )
  async getList(ctx: Context): Promise<void> {
    // get list
    const { parameter } = ctx.state;
    await rightsRelationService.getList(parameter);
  }
  @del("/:id")
  @summary("删除RightsRelation")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async del(ctx: Context): Promise<void> {
    // del item
    const { id } = ctx.state.parameter;
    await rightsRelationService.del(id);
  }

  @post("/edit")
  @summary("RightsRelation编辑")
  @parameter(joi.object({}), "body")
  async edit(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    await rightsRelationService.edit(body);
  }
}

export default new RightsRelationApi().init();
