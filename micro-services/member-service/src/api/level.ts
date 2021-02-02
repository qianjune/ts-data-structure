/**
 * @description Level api
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
import LevelService from "@src/services/v2/level";
import SessionCookieHandler from "@src/utils/session_cookie";
import { levelBody } from "./joi_module";
const levelService = new LevelService();
@prefix("/api/level")
@tag("Level相关服务")
class LevelApi extends BaseRouter {
  @post("/create")
  @summary("Level创建")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(levelBody, "body")
  async create(ctx: Context): Promise<void> {
    // create item
    const { body } = ctx.request;
    await levelService.create(body);
  }
  @get("/detail/:id")
  @summary("Level详情")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async getInfo(ctx: Context): Promise<void> {
    // get info
    const { id } = ctx.state.parameter;
    await levelService.getInfo(id);
  }
  @get("/list")
  @summary("Level列表")
  @middleware(SessionCookieHandler.loginCheck)
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
    await levelService.getList(parameter);
  }
  @del("/:id")
  @summary("删除Level")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async del(ctx: Context): Promise<void> {
    // del item
    const { id } = ctx.state.parameter;
    await levelService.del(id);
  }

  @post("/edit")
  @summary("Level编辑")
  @parameter(joi.object({}), "body")
  async edit(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    await levelService.edit(body);
  }
}

export default new LevelApi().init();
