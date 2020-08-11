import BaseRouter, { prefix, tag, get, summary, middleware } from "@src/lib/router-decorator";
import { ResponseHandler } from "@src/utils/responseHandler";
import { ManagerResponseSuccess } from "@src/manager/response";
import SessionCookieHandler from "@src/utils/session_cookie";
const qiniu = require('qiniu')
const AK = '2ZCvhBFksrVxcxv8KbOAsMJEZho5IE1pJv8DBnaU';
const SK = '2fr7-22iOPl1FU47wVyMkdD64xCb2ZNq2uRdh-7N';
@prefix('/api/qiniu')
@tag('qiniu service')
class QiniuRouter extends BaseRouter {
  @get('/token')
  @summary('获取qinniu上传token')
  @middleware(SessionCookieHandler.loginCheck)
  getUploadToken() {
    const accessKey = AK;
    const secretKey = SK;
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const options = {
      scope: 'jblog-mall-pic',
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    return ResponseHandler.send(
      new ManagerResponseSuccess({
        msg: 'qiniu upload token',
        data: { uploadToken }
      }))
  }
}
const qiniuRouter = new QiniuRouter()
export default qiniuRouter.init()