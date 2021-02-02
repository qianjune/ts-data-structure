/**
 * @description LevelGroup api
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
import LevelGroupService from "@src/services/v2/levelGroup";
import SessionCookieHandler from "@src/utils/session_cookie";
import { levelBody } from "./joi_module";
const levelGroupService = new LevelGroupService();
@prefix("/api/levelGroup")
@tag("LevelGroup相关服务")
class LevelGroupApi extends BaseRouter {
  @post("/create")
  @summary("LevelGroup创建")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    joi.object({
      name: joi.string().required(),
      // levelGroup: joi.array().items(levelBody).required(),
    }),
    "body"
  )
  async create(ctx: Context): Promise<void> {
    // create item
    const { body } = ctx.request;
    await levelGroupService.create(body);
  }
  @get("/detail/:id")
  @summary("LevelGroup详情")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async getInfo(ctx: Context): Promise<void> {
    // get info
    const { id } = ctx.state.parameter;
    await levelGroupService.getInfo(id);
  }
  @get("/list")
  @summary("LevelGroup列表")
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
    await levelGroupService.getList(parameter);
  }
  @del("/:id")
  @summary("删除LevelGroup")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async del(ctx: Context): Promise<void> {
    // del item
    const { id } = ctx.state.parameter;
    await levelGroupService.del(id);
  }

  @post("/edit")
  @summary("LevelGroup编辑")
  @parameter(joi.object({}), "body")
  async edit(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    await levelGroupService.edit(body);
  }

  @get("/test/match/level")
  @summary("测试匹配等级")
  @parameter(
    joi.object({
      id: joi.number().required(),
      preValue: joi.number().required(),
      currentValue: joi.number().required(),
    }),
    "query"
  )
  async testMatchLevel(ctx: Context): Promise<void> {
    await levelGroupService.matchLevel(ctx.state.parameter);
  }
}

export default new LevelGroupApi().init();
