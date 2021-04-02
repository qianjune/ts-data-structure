/**
 * @description 埋点页面配置 api
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
import PageService from "@micro-services/buried-point-service/src/services/page";
const pageService = new PageService();

@prefix("/api/page")
@tag("埋点页面配置相关服务")
class PageApi extends BaseRouter {
  /**
   * 创建
   * @param ctx
   */
  @post("/create")
  @summary("埋点页面配置创建")
  @parameter(
    joi.object({
      name: joi.string().required(),
      path: joi.string().required(),
      image: joi.string(),
    }),
    "body"
  )
  async create(ctx: Context): Promise<void> {
    // create item
    const { body } = ctx.request;
    await pageService.create(body);
  }

  /**
   * 获取详情
   * @param ctx
   */
  @get("/detail/:id")
  @summary("埋点页面配置详情")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async getInfo(ctx: Context): Promise<void> {
    // get info
    const { id } = ctx.state.parameter;
    await pageService.getInfo(id);
  }

  /**
   * 获取列表
   * @param ctx
   */
  @get("/list")
  @summary("埋点页面配置列表")
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
    await pageService.getList(parameter);
  }

  /**
   * 删除
   * @param ctx
   */
  @del("/:id")
  @summary("删除埋点页面配置")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async del(ctx: Context): Promise<void> {
    // del item
    const { id } = ctx.state.parameter;
    await pageService.del(id);
  }

  /**
   * 编辑
   * @param ctx 、
   */
  @post("/edit")
  @summary("埋点页面配置编辑")
  @parameter(joi.object({}), "body")
  async edit(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    await pageService.edit(body);
  }
}

export default new PageApi().init();
