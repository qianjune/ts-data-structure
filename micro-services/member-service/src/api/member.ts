import joi from "@hapi/joi";
import Auth from "@root/middleware/auth";
import BaseRouter, {
  get,
  post,
  middleware,
  parameter,
  prefix,
  put,
  summary,
  tag,
} from "@src/lib/router-decorator";
import { Context } from "koa";
import SessionCookieHandler from "@src/utils/session_cookie";
import { MemberService } from "@micro-services/member-service/src/services";
const memberService = new MemberService();
@prefix("/api/member")
@tag("会员相关服务")
class MemberRouter extends BaseRouter {
  @post("/create")
  @summary("创建会员")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    joi.object({
      nickName: joi.string().required(),
      sex: joi.string(),
      birthday: joi.string(),
    }),
    "body"
  )
  async createNewMember(ctx: Context) {
    console.log(ctx.request.body);
    const body = ctx.request.body;
    await memberService.create({ ...body, userId: global.state.userInfo.id });
  }
  @get("/list")
  @summary("会员列表")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    joi.object({
      pageSize: joi.number().required(),
      pageNo: joi.number().required(),
    }),
    "query"
  )
  async getList(ctx: Context): Promise<void> {
    const { parameter } = ctx.state;
    await memberService.getList(parameter);
  }
  @post("/edit")
  @parameter(
    joi.object({
      nickName: joi.string(),
      sex: joi.number(),
      tel: joi.string().length(11),
      birthday: joi.string(),
      id: joi.number().required(),
    }),
    "body"
  )
  async editMemberInfo(ctx: Context): Promise<void> {
    const body = ctx.request.body;
    await memberService.edit({ ...body, userId: global.state.userInfo.id });
  }

  @get("/info")
  @summary("获取会员信息")
  @middleware(SessionCookieHandler.loginCheck)
  async getDetail(ctx: Context) {
    console.log("C护发");
    await memberService.getInfo(global.state.userInfo.id);
  }
}

const memberRouter = new MemberRouter();

export default memberRouter.init();
