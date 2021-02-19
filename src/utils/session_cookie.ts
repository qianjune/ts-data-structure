/**
 * @description session_cookie 中间件
 */
import redisStore from "koa-redis";
import session, { SessionStore } from "koa-generic-session";
import config from "@root/config/config";
import { Context } from "koa";

class SessionCookieHandler {
  static init(app: any): void {
    app.keys = ["Udke_53098&"];
    app.use(
      session({
        key: "uc.sid", // cookie name 默认是 `koa.sid`
        prefix: "uc:sess:", // redis key的前缀，默认是`koa:sess:`
        cookie: {
          path: "/",
          httpOnly: true, // 客户端不能修改cookie
          maxAge: 24 * 60 * 60 * 1000, // ms
        },
        ttl: 24 * 60 * 60 * 1000, // redis过期时间，默认和maxAge相同
        store: redisStore({
          // all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
          host: config.REDIS_CONF.host,
          port: config.REDIS_CONF.port,
          password: config.REDIS_CONF.password,
        }) as any,
      })
    );
  }
  static async loginCheck(ctx: Context, next: () => void): Promise<void> {
    console.log(ctx.session, "ctx.session...");
    if (ctx.session && ctx.session.userInfo) {
      global.state.userInfo = ctx.session.userInfo;

      await next();
      return;
    }
    throw new global.errs.FailByAuth("请正确登录（cookie)");
  }
}

export default SessionCookieHandler;
