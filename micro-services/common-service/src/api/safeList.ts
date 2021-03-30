/**
 * @description 安全名单 api
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
  put,
} from "@src/lib/router-decorator";
import { Context } from "koa";
import SafeListService from "@micro-services/common-service/src/services/safeList";
import { SAFE_TYPE } from "../db/safeList";
const safeListService = new SafeListService();

@prefix("/api/safeList")
@tag("安全名单相关服务")
class SafeListApi extends BaseRouter {
  /**
   * 创建
   * @param ctx
   */
  @post("/create")
  @summary("安全名单创建")
  @parameter(
    joi.object({
      name: joi.string().required(),
      type: joi.string().allow(SAFE_TYPE.BLACK, SAFE_TYPE.WHITE).required(),
      data: joi.array().items(joi.string()).required(),
    }),
    "body"
  )
  async create(ctx: Context): Promise<void> {
    // create item
    const { body } = ctx.request;
    await safeListService.create(body);
  }

  /**
   * 获取详情
   * @param ctx
   */
  @get("/detail/:id")
  @summary("安全名单详情")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async getInfo(ctx: Context): Promise<void> {
    // get info
    const { id } = ctx.state.parameter;
    await safeListService.getInfo(id);
  }

  /**
   * 获取列表
   * @param ctx
   */
  @get("/list")
  @summary("安全名单列表")
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
    await safeListService.getList(parameter);
  }

  /**
   * 删除
   * @param ctx
   */
  @del("/:id")
  @summary("删除安全名单")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async del(ctx: Context): Promise<void> {
    // del item
    const { id } = ctx.state.parameter;
    await safeListService.del(id);
  }

  /**
   * 编辑
   * @param ctx 、
   */
  @post("/edit")
  @summary("安全名单编辑")
  @parameter(joi.object({}), "body")
  async edit(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    await safeListService.edit(body);
  }

  @put("/add-keywords")
  @summary("安全名单编辑")
  @parameter(
    joi.object({
      id: joi.number().required(),
      data: joi.array().items(joi.string()),
    }),
    "body"
  )
  async addKeywords(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    await safeListService.edit(body, { type: "add" });
  }
  @put("/del-keywords")
  @summary("安全名单编辑")
  @parameter(
    joi.object({
      id: joi.number().required(),
      data: joi.array().items(joi.string()),
    }),
    "body"
  )
  async delOneKeywords(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    await safeListService.edit(body, { type: "del" });
  }

  @post("/match")
  @summary("安全名单编辑")
  @parameter(
    joi.object({
      id: joi.number().required(),
      content: joi.string().required(),
    }),
    "body"
  )
  async matchContent(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    await safeListService.match(body);
  }
}

export default new SafeListApi().init();
