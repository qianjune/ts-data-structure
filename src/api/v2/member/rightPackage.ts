/**
 * @description RightPackage api
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
import RightPackageService from "@src/services/v2/rightPackage";
const rightPackageService = new RightPackageService();
@prefix("/api/rightPackage")
@tag("RightPackage相关服务")
class RightPackageApi extends BaseRouter {
  @post("/create")
  @summary("RightPackage创建")
  @parameter(
    joi.object({
      name: joi.string().required(),
    }),
    "body"
  )
  async create(ctx: Context): Promise<void> {
    // create item
    const { body } = ctx.request;
    await rightPackageService.create(body);
  }
  @get("/detail/:id")
  @summary("RightPackage详情")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async getInfo(ctx: Context): Promise<void> {
    // get info
    const { id } = ctx.state.parameter;
    await rightPackageService.getInfo(id);
  }
  @get("/list")
  @summary("RightPackage列表")
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
    await rightPackageService.getList(parameter);
  }
  @del("/:id")
  @summary("删除RightPackage")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async del(ctx: Context): Promise<void> {
    // del item
    const { id } = ctx.state.parameter;
    await rightPackageService.del(id);
  }

  @post("/edit")
  @summary("RightPackage编辑")
  @parameter(joi.object({}), "body")
  async edit(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    await rightPackageService.edit(body);
  }
}

export default new RightPackageApi().init();
