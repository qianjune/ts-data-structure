import BaseRouter, {
  prefix,
  tag,
  post,
  summary,
  parameter,
  middleware,
  get,
} from "@src/lib/router-decorator";
import Joi from "joi";
import { Context } from "koa";
import JwtHandler from "@src/utils/jwt_handler";
import SessionCookieHandler from "@src/utils/session_cookie";
import ShopService from "../services/shop";
const shopService = new ShopService();
@prefix("/api/shop")
@tag("店铺相关服务")
class ShopRouter extends BaseRouter {
  @post("/create")
  @summary("店铺创建")
  // @middleware(JwtHandler.loginCheck)
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    Joi.object({
      name: Joi.string().required(),
    }),
    "body"
  )
  async createShop(ctx: Context): Promise<void> {
    const { body } = ctx.request;
    console.log(ctx.session, "ctx.session");
    console.log(global.state, "global.state");
    await shopService.create(body);
  }
  @get("/list")
  @summary("店铺列表")
  @parameter(
    Joi.object({
      pageSize: Joi.number().required(),
      pageNo: Joi.number().required(),
    }),
    "query"
  )
  async getList(ctx: Context) {
    await shopService.getList(ctx.state.parameter);
  }
  @get("/detail/:id")
  @summary("店铺详情")
  @parameter(
    Joi.object({
      id: Joi.string().required(),
    }),
    "params"
  )
  async getInfoById(ctx: Context) {
    const { id } = ctx.state.parameter;
    await shopService.getInfo(id);
  }

  // @
  // async getShopRecommendGoodsList(ctx: Context) {

  // }
}

const shopRouter = new ShopRouter();
export default shopRouter.init();
