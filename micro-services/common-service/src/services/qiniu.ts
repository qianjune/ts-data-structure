import fs from "fs";
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import { ListParamsInterface } from "@src/manager/interface";
import { ManagerResponseSuccess } from "@src/manager/response";
import qiniu from "qiniu";

const AK = "2ZCvhBFksrVxcxv8KbOAsMJEZho5IE1pJv8DBnaU";
const SK = "2fr7-22iOPl1FU47wVyMkdD64xCb2ZNq2uRdh-7N";
// const qiniu = require("qiniu");

class QiniuService {
  accessKey: string;
  secretKey: string;
  mac: any;
  options: any;
  config: any;
  constructor() {
    this.options = {
      scope: "jblog-mall-pic",
    };
    this.accessKey = AK;
    this.secretKey = SK;
    this.mac = new qiniu.auth.digest.Mac(this.accessKey, this.secretKey);
    this.config = new qiniu.conf.Config();
    this.config.zone = qiniu.zone.Zone_z2;
  }
  uploadToken(): void {
    const putPolicy = new qiniu.rs.PutPolicy(this.options);

    const uploadToken = putPolicy.uploadToken(this.mac);
    return ResponseHandler.send(
      new ManagerResponseSuccess({
        msg: "qiniu upload token",
        data: { uploadToken },
      })
    );
  }
  uploadPic({ path, name }: { path: string; name: string }): Promise<any> {
    return new Promise((resolve, reject) => {
      const putPolicy = new qiniu.rs.PutPolicy(this.options);

      const uploadToken = putPolicy.uploadToken(this.mac);
      const formUploader = new qiniu.resume_up.ResumeUploader(this.config);
      const putExtra = new qiniu.form_up.PutExtra();

      formUploader.putFile(
        uploadToken,
        name,
        path,
        putExtra,
        (respErr, respBody, respInfo) => {
          if (respErr) {
            throw respErr;
          }
          if (respInfo.statusCode == 200) {
            console.log(respBody);

            resolve(respBody);
          } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
            reject(respBody);
          }
        }
      );
    });
  }
  async getList(): Promise<void> {
    const listPrefixReq = new qiniu.rs.BucketManager(this.mac);
    const listPromise = () => {
      return new Promise((resolve, reject) => {
        listPrefixReq.listPrefix(
          this.options.scope,
          {},
          (err: any, data: any) => {
            if (err) reject(err);
            resolve(data);
          }
        );
      });
    };
    const list: any = await listPromise();
    console.log(list);
    return ResponseHandler.send(
      new ManagerResponseSuccess({
        msg: "qiniu upload token",
        data: { data: list?.items ?? [] },
      })
    );
  }
}

export default QiniuService;
