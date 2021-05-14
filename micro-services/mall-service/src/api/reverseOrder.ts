/**
 * @description 逆向订单 api
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
import ReverseOrderService from "@micro-services/mall-service/src/services/reverseOrder";
const reverseOrderService = new ReverseOrderService();

@prefix("/api/reverseOrder")
@tag("逆向订单相关服务")
class ReverseOrderApi extends BaseRouter {
  /**
   * 创建
   * @param ctx
   */
  @post("/create")
  @summary("逆向订单创建")
  @parameter(joi.object({}), "body")
  async create(ctx: Context): Promise<void> {
    // create item
    const { body } = ctx.request;
    ResponseHandler.send(await reverseOrderService.create(body));
  }

  /**
   * 获取详情
   * @param ctx
   */
  @get("/detail/:id")
  @summary("逆向订单详情")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async getInfo(ctx: Context): Promise<void> {
    // get info
    const { id } = ctx.state.parameter;
    ResponseHandler.send(await reverseOrderService.getInfo(id));
  }

  /**
   * 获取列表
   * @param ctx
   */
  @get("/list")
  @summary("逆向订单列表")
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
    ResponseHandler.send(await reverseOrderService.getList(parameter));
  }

  /**
   * 删除
   * @param ctx
   */
  @del("/:id")
  @summary("删除逆向订单")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async del(ctx: Context): Promise<void> {
    // del item
    const { id } = ctx.state.parameter;
    ResponseHandler.send(await reverseOrderService.del(id));
  }

  /**
   * 编辑
   * @param ctx 、
   */
  @post("/edit")
  @summary("逆向订单编辑")
  @parameter(joi.object({}), "body")
  async edit(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    ResponseHandler.send(await reverseOrderService.edit(body));
  }
}

export default new ReverseOrderApi().init();
