/**
 * @description 分类 相关接口
 */

import BaseRouter, {
  get,
  prefix,
  tag,
  post,
  summary,
  middleware,
  parameter,
} from "@src/lib/router-decorator";
import { Context } from "koa";
import SessionCookieHandler from "@src/utils/session_cookie";
import Joi from "@hapi/joi";
import CategoryService from "../services/category";
const categoryService = new CategoryService();
@prefix("/api/category")
@tag("分类-相关服务")
class CategoryRouter extends BaseRouter {
  @post("/create")
  @summary("分类-创建")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      name: Joi.string().required(),
      parentId: Joi.number(),
    }),
    "body"
  )
  async createCategory(ctx: Context): Promise<void> {
    const { body } = ctx.request;
    await categoryService.create(body);
  }
  @get("/list")
  @summary("分类-列表")
  // @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      pageSize: Joi.number().required(),
      pageNo: Joi.number().required(),
      parentId: Joi.number(),
      shopId: Joi.number().allow(null),
      level: Joi.number().allow(null),
    }),
    "query"
  )
  async getList(ctx: Context) {
    const { parameter } = ctx.state;
    await categoryService.getList(parameter);
  }
  @post("/del")
  @summary("删除-分类-通过id")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      id: Joi.number().required(),
    }),
    "body"
  )
  async delCategory(ctx: Context): Promise<void> {
    const { body } = ctx.request;
    await categoryService.del(body.id);
  }

  // 店铺创建和编辑需要验证店铺token
  @post("/create/shop")
  @summary("店铺-产品分类-创建")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      name: Joi.string().required(),
      parentId: Joi.number().required(),
      shopId: Joi.number().required(),
    }),
    "body"
  )
  async createShopCategory(ctx: Context): Promise<void> {
    const { body } = ctx.request;
    await categoryService.create(body);
  }

  // 店铺列表自己需要验证店铺token，返回会显示全部分类
  @get("/customer/list/platform")
  @summary("店铺-产品分类-列表-平台层面(0为根结点)")
  // @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      pageSize: Joi.number().required(),
      pageNo: Joi.number().required(),
      parentId: Joi.number(),
    }),
    "query"
  )
  async getListInShop(ctx: Context) {
    const { parameter } = ctx.state;
    await categoryService.getList(parameter, { omit: ["status"] });
  }

  // 店铺列表-对外-返回状态status:1,返回分类的列表
  @get("/customer/list")
  @summary("买家获取店铺-产品分类-列表")
  @parameter(
    Joi.object({
      pageSize: Joi.number().required(),
      pageNo: Joi.number().required(),
      shopId: Joi.number().required(),
    }),
    "query"
  )
  async getListByParentId(ctx: Context) {
    const { parameter } = ctx.state;
    await categoryService.getList(
      { ...parameter, status: 1 },
      {
        omit: ["status"],
      }
    );
  }
}

const categoryRouter = new CategoryRouter();
export default categoryRouter.init();
