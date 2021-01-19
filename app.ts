import path from "path";
import Koa, { Context } from "koa";
import parser from "koa-bodyparser";
import { InitManager } from "@root/core/init";
import catchError from "@root/middleware/exception";
import cors from "koa2-cors";
import serve from "koa-static";
import koaSwagger from "koa2-swagger-ui";
import { GlobalErrorInterface } from "@root/core/http-exception";
import status, { HttpStatus } from "http-status";
import SessionCookieHandler from "@src/utils/session_cookie";
import _, { omitBy, isNil, LoDashStatic } from "lodash";
import server from "@src/graphql/index";
import mockMain from "@src/graphql/middleware/auth";

_.mixin({
  omitNil(data) {
    return omitBy(data, isNil);
  },
});
// 暂时解决报错，照理说@types/body-parser里应该会生效
declare module "koa" {
  interface Request {
    body?: any;
    rawBody: string;
  }
}
declare global {
  namespace NodeJS {
    interface Global {
      config: any;
      errs: GlobalErrorInterface;
      swagger: any;
      status: HttpStatus;
      state: {
        userInfo?: {
          id: number;
        };
        mock: boolean;
        [keyName: string]: any;
      };
      util: {
        lodash: LoDashStatic & {
          omitNil: (data: Record<string, any>) => Record<string, any>;
        };
      };
    }
  }
}
if (!global.state) {
  global.state = {
    mock: true,
  };
}
if (!global.util) {
  global.util = {
    lodash: _ as LoDashStatic & {
      omitNil: (data: Record<string, any>) => Record<string, any>;
    },
  };
}

const app = new Koa();

app.use(
  cors({
    // origin: (ctx: Context) => { //设置允许来自指定域名请求
    //   return 'http://localhost:9000'; //只允许http://localhost:8080这个域名的请求
    // },
    origin: "http://localhost:9000",
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //设置所允许的HTTP请求方法
    allowHeaders: ["Content-Type", "Authorization", "Accept"], //设置服务器支持的所有头信息字段
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"], //设置获取其他自定义字段
  })
);
SessionCookieHandler.init(app);
app.use(serve(path.join(__dirname, "public/")));
app.use(catchError);
app.use(
  parser({
    enableTypes: ["json", "form", "text"],
  })
);

InitManager.initCore(app);

app.use(
  koaSwagger({
    routePrefix: "/v2/swagger",
    swaggerOptions: {
      url: "http://localhost:3111/v2/swagger-schema",
    },
  })
);
app.use(mockMain);
// server.applyMiddleware({ app: app as any })
export { server };

export default app;
