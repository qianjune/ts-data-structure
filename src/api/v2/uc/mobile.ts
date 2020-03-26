/**
 * @description 手机相关
 */

import BaseRouter, { get, post, middleware, parameter, prefix, put, summary, tag } from '../../../lib/router-decorator'

@prefix('/api/user/mobile')
@tag('用户中心-手机服务')
class MobileRouter extends BaseRouter {

}

const mobileRouter = new MobileRouter()
export default mobileRouter.init()