/**
 * @description 用户浏览路径 api
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
import UserBrowsePathService from "@micro-services/buried-point-service/src/services/userBrowsePath";
const userBrowsePathService = new UserBrowsePathService();

@prefix("/api/userBrowsePath")
@tag("用户浏览路径相关服务")
class UserBrowsePathApi extends BaseRouter {
  /**
   * 创建
   * @param ctx
   */
  @post("/create")
  @summary("用户浏览路径创建")
  @parameter(joi.object({}), "body")
  async create(ctx: Context): Promise<void> {
    // create item
    const { body } = ctx.request;
    await userBrowsePathService.create(body);
  }

  /**
   * 获取详情
   * @param ctx
   */
  @get("/detail/:id")
  @summary("用户浏览路径详情")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async getInfo(ctx: Context): Promise<void> {
    // get info
    const { id } = ctx.state.parameter;
    await userBrowsePathService.getInfo(id);
  }

  /**
   * 获取列表
   * @param ctx
   */
  @get("/list")
  @summary("用户浏览路径列表")
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
    await userBrowsePathService.getList(parameter);
  }

  /**
   * 删除
   * @param ctx
   */
  @del("/:id")
  @summary("删除用户浏览路径")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async del(ctx: Context): Promise<void> {
    // del item
    const { id } = ctx.state.parameter;
    await userBrowsePathService.del(id);
  }

  /**
   * 编辑
   * @param ctx 、
   */
  @post("/edit")
  @summary("用户浏览路径编辑")
  @parameter(joi.object({}), "body")
  async edit(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    await userBrowsePathService.edit(body);
  }
}

export default new UserBrowsePathApi().init();
