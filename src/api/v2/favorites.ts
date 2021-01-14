/**
 * @description FavoritesApi api
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
import FavoritesService from "@src/services/v2/favorites";
import SessionCookieHandler from "@src/utils/session_cookie";
const favoritesService = new FavoritesService();
@prefix("/api/favorite")
@tag("收藏 - 相关服务")
class FavoritesApi extends BaseRouter {
  @post("/create")
  @summary("FavoritesApi创建")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    joi.object({
      type: joi.string().required(),
      likeId: joi.number().required(),
      id: joi.number(),
    }),
    "body"
  )
  async create(ctx: Context): Promise<void> {
    await favoritesService.create({
      ...ctx.state.parameter,
      uid: global.state.userInfo.id,
    });
  }
  @get("/detail/:id")
  @summary("FavoritesApi详情")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async getInfo(ctx: Context): Promise<void> {
    // get info
  }
  @get("/list")
  @summary("FavoritesApi列表")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    joi.object({
      pageSize: joi.number().required(),
      pageNo: joi.number().required(),
      type: joi.string().required(),
    }),
    "query"
  )
  async getList(ctx: Context): Promise<void> {
    await favoritesService.getList({
      ...ctx.state.parameter,
      uid: global.state.userInfo.id,
    });
  }
  @del("/:id")
  @summary("删除FavoritesApi")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async del(ctx: Context): Promise<void> {
    // del item
    const { id } = ctx.state.parameter;
    await favoritesService.del(id);
  }

  @post("/edit")
  @summary("FavoritesApi编辑")
  @parameter(joi.object({}), "body")
  async edit(ctx: Context): Promise<void> {
    // edit item
  }
}

export default new FavoritesApi().init();
