import fs from "fs";
import path from "path";
import Router from "koa-router";
import xlsx from "node-xlsx";
import BaseRouter, {
  get,
  parameter,
  post,
  prefix,
  summary,
  tag,
} from "@src/lib/router-decorator";
import Joi from "@hapi/joi";
import { Context } from "koa";
import { ResponseHandler } from "@src/utils/responseHandler";
import { ManagerResponseSuccess } from "@src/manager/response";

@prefix("/api/v2/excel")
@tag("微信相关服务")
class ExcelApi extends BaseRouter {
  @get("/typeCode")
  @parameter(Joi.object({}), "query")
  getAmapTypeCode(ctx: Context): void {
    console.log(
      xlsx.parse(`${__dirname}/../../../../public/amap_poicode.xlsx`)
    );
    const result: {
      [keyName: string]: any;
    } = {};
    xlsx
      .parse(`${__dirname}/../../../../public/amap_poicode.xlsx`)[2]
      .data.slice(1)
      .forEach((arr) => {
        result[arr[1] as any] = {
          big: arr[2],
          mid: arr[3],
          small: arr[4],
        };
      });
    ResponseHandler.send(
      new ManagerResponseSuccess({
        data: result,
        msg: "高德地图地址类型码请求成功",
      })
    );
  }

  @get("/products")
  @summary("店铺列表")
  @parameter(Joi.object({}), "query")
  getProducts(ctx: Context): void {
    const data = [
      [1, 2, 3],
      [true, false, null, "sheetjs"],
      ["foo", "bar", new Date("2014-02-19T14:30Z"), "0.3"],
      ["baz", null, "qux"],
    ];
    const options = {
      "!cols": [{ wch: 6 }, { wch: 7 }, { wch: 10 }, { wch: 20 }],
    };

    const buffer = xlsx.build([{ name: "mySheetName", data }], options); // Returns a buffer
    const filePath = path.join(process.cwd(), `public/demo2.xlsx`);
    // fs.writeFileSync(filePath, buffer);
    ctx.body = {
      url: "http://localhost:3111/demo2.xlsx",
    };
  }
}
const excelApi = new ExcelApi();
export default excelApi.init();
