/**
 * @description 手机相关
 */

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
import EmailService from "../services/email";
@prefix("/api/user/mobile")
@tag("用户中心-手机服务")
class MobileRouter extends BaseRouter { }

const mobileRouter = new MobileRouter();
export default mobileRouter.init();
