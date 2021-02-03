/**
 * @description 邮箱相关
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

@prefix("/api/user/email")
@tag("用户中心-邮箱服务")
class EmailRouter extends BaseRouter { }

const emailRouter = new EmailRouter();
export default emailRouter.init();
