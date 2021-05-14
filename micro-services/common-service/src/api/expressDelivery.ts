/**
 * @description 快递物流服务 api
 */

import joi from "joi";
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
import { ResponseHandler } from "@src/utils/responseHandler";
import ExpressDeliveryService from "@micro-services/common-service/src/services/expressDelivery";
const expressDeliveryService = new ExpressDeliveryService();

@prefix("/api/expressDelivery")
@tag("快递物流服务相关服务")
class ExpressDeliveryApi extends BaseRouter {
  /**
   * 创建
   * @param ctx
   */
  @post("/create")
  @summary("快递物流服务创建")
  @parameter(joi.object({}), "body")
  async create(ctx: Context): Promise<void> {
    // create item
    const { body } = ctx.request;
    ResponseHandler.send(await expressDeliveryService.create(body));
  }

  /**
   * 获取详情
   * @param ctx
   */
  @get("/detail/:id")
  @summary("快递物流服务详情")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async getInfo(ctx: Context): Promise<void> {
    // get info
    const { id } = ctx.state.parameter;
    ResponseHandler.send(await expressDeliveryService.getInfo(id));
  }

  /**
   * 获取列表
   * @param ctx
   */
  @get("/list")
  @summary("快递物流服务列表")
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
    ResponseHandler.send(await expressDeliveryService.getList(parameter));
  }

  /**
   * 删除
   * @param ctx
   */
  @del("/:id")
  @summary("删除快递物流服务")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async del(ctx: Context): Promise<void> {
    // del item
    const { id } = ctx.state.parameter;
    ResponseHandler.send(await expressDeliveryService.del(id));
  }

  /**
   * 编辑
   * @param ctx 、
   */
  @post("/edit")
  @summary("快递物流服务编辑")
  @parameter(joi.object({}), "body")
  async edit(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    ResponseHandler.send(await expressDeliveryService.edit(body));
  }
}

export default new ExpressDeliveryApi().init();
