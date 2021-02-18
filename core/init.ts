import Router from "koa-router";
import requireDirectory from "@src/utils/require-directory";
import status, { HttpStatus } from "http-status";
import config from "@root/config/config";
import SessionCookieHandler from "@src/utils/session_cookie";
import ConsoleBox from "@src/utils/console_box";
import Application from "koa";
import socketLoader from "./socket";
import errors from "./http-exception";

export class InitManager {
  static app: Application;
  static initCore(app: Application): void {
    InitManager.app = app;
    InitManager.loadConfig();
    // SessionCookieHandler.init(InitManager.app)

    InitManager.initLoadRouters();
    InitManager.loadHttpException();
    InitManager.loadHttpStatus();
    InitManager.loadSocket();
  }
  static initLoadRouters(): void {
    const whenLoadModule = (obj: any): void => {
      if (obj.default instanceof Router) {
        ConsoleBox.info(
          `路由{${(obj.default as any)?.otherProps?.tag ?? ""
          }}加载中，请耐心等待。。。`
        );
        InitManager.app.use(obj.default.routes());
      }
    };
    const ms = "micro-services";
    const needToRequireDirectoryGroup = [
      "",
      `/${ms}/user-service`,
      `/${ms}/member-service`,
      `/${ms}/mall-service`,
      `/${ms}/common-service`,
    ];
    needToRequireDirectoryGroup.forEach((path) => {
      const apiDirectory = `${process.cwd()}${path}/src/api`;
      requireDirectory(module, apiDirectory, { visit: whenLoadModule });
    });
  }
  static loadConfig(): void {
    global.config = config;
  }
  static loadHttpException(): void {
    global.errs = errors;
  }
  static loadHttpStatus(): void {
    global.status = status as HttpStatus & string;
  }
  static loadSocket(): void {
    socketLoader(InitManager.app);
  }
  // session 配置
  // static loadSession(){
  //   InitManager.app.use(session)
  // }
}

export default InitManager;
