/**
 * @description 腾讯云函数调用
 */

// Node.js SDK
// https://cloud.tencent.com/document/product/583/19694

// 运行函数
// https://console.cloud.tencent.com/api/explorer?Product=scf&Version=2018-04-16&Action=Invoke&SignVersion=

// 运行函数
// https://cloud.tencent.com/document/api/583/17243#2.-.E8.BE.93.E5.85.A5.E5.8F.82.E6.95.B0

// API 概览
// https://cloud.tencent.com/document/product/583/17235

// 控制台
// https://console.cloud.tencent.com/ssr/detail?stageName=dev&appName=koa-starter-b5b6d04e&instanceName=koa-starter&stageList=dev

// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher

import tencentcloud from "tencentcloud-sdk-nodejs";
const ScfClient = tencentcloud.scf.v20180416.Client;

const clientConfig = {
  credential: {
    secretId: "AKIDrU2aPDscAYhfiEwhtthnsjS3Qe09YvIY",
    secretKey: "HQRzPbWGo7XgaEdlqhV4NSHr9I8sMlPo",
  },
  region: "ap-shanghai",
  profile: {
    httpProfile: {
      endpoint: "scf.tencentcloudapi.com",
    },
  },
};

const client = new ScfClient(clientConfig);
const params = {
  FunctionName: "helloworld-1618540999",
};
client.Invoke(params).then(
  (data) => {
    console.log(data);
  },
  (err) => {
    console.error("error", err);
  }
);
