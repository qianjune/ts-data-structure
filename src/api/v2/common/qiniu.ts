import BaseRouter, { prefix, tag, get, summary, middleware } from "@src/lib/router-decorator";
import { ResponseHandler } from "@src/utils/responseHandler";
import { ManagerResponseSuccess } from "@src/manager/response";
import SessionCookieHandler from "@src/utils/session_cookie";

import QiniuService from '@src/services/v2/qiniu'
const qiniuService = new QiniuService()

@prefix('/api/qiniu')
@tag('七牛-存储-服务')
class QiniuRouter extends BaseRouter {
  @get('/token')
  @summary('获取qinniu上传token')
  @middleware(SessionCookieHandler.loginCheck)
  getUploadToken() {
    qiniuService.uploadToken()
  }

  @get('/pic/list')
  @summary('获取文件列表')
  @middleware(SessionCookieHandler.loginCheck)
  async getPicList() {
    await qiniuService.getList()
  }
}
const qiniuRouter = new QiniuRouter()
export default qiniuRouter.init()