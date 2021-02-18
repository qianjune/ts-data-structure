/**
 * @description 微信表情包处理
 */

import fs from "fs";
import path from "path";
import Router from "koa-router";
import { Context } from "koa";
// import multer from "@koa/multer";
// const upload = multer();

const router = new Router({
  prefix: "/wechat/expression",
});

router.post("/upload", async (ctx) => {
  console.log(ctx.request.files);
  console.log(ctx.request.body);
  ctx.body = JSON.stringify(ctx.request.files);
});

export default router;
