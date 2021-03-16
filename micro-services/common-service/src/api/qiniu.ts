import fs from "fs";
import BaseRouter, {
  prefix,
  tag,
  get,
  summary,
  middleware,
  post,
} from "@src/lib/router-decorator";
import { ResponseHandler } from "@src/utils/responseHandler";
import { ManagerResponseSuccess } from "@src/manager/response";
import SessionCookieHandler from "@src/utils/session_cookie";
import { Context } from "koa";
import config from "@root/config/config";
import QiniuService from "../services/qiniu";
const qiniuService = new QiniuService();

@prefix("/api/qiniu")
@tag("七牛-存储-服务")
class QiniuRouter extends BaseRouter {
  @get("/token")
  @summary("获取qinniu上传token")
  @middleware(SessionCookieHandler.loginCheck)
  getUploadToken() {
    qiniuService.uploadToken();
  }

  @get("/pic/list")
  @summary("获取文件列表")
  @middleware(SessionCookieHandler.loginCheck)
  async getPicList() {
    await qiniuService.getList();
  }

  @post("/pic/upload")
  @summary("上传图片")
  // @middleware(SessionCookieHandler.loginCheck)
  async uploadImage(ctx: Context) {
    const { file } = ctx.request.files;
    console.log(file, "....files");

    const cloneFile: any = file;
    const path = `dist/images/${cloneFile?.name}`;
    console.log(fs.readFileSync(cloneFile?.path));
    fs.writeFileSync(path, fs.readFileSync(cloneFile?.path));
    const uploadResult = await qiniuService.uploadPic({
      path,
      name: cloneFile?.name,
    });
    if (uploadResult?.hash) {
      fs.unlinkSync(path);
      ResponseHandler.send(
        new ManagerResponseSuccess({
          data: { url: `${config.qiniu.host}${uploadResult.key}` },
          msg: "image upload success",
        })
      );
    }
  }
}
const qiniuRouter = new QiniuRouter();
export default qiniuRouter.init();
