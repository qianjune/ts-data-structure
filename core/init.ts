import Router from 'koa-router'
import requireDirectory from '@src/utils/require-directory'
import status, { HttpStatus } from 'http-status'
import config from '@root/config/config'
import errors from './http-exception'
import socketLoader from './socket'
import SessionCookieHandler from '@src/utils/session_cookie'
import ConsoleBox from '@src/utils/console_box'
import Application from 'koa'

export class InitManager {
  static app: Application
  static initCore(app: Application): void {
    InitManager.app = app
    InitManager.loadConfig()
    InitManager.initLoadRouters()
    InitManager.loadHttpException()
    InitManager.loadHttpStatus()
    InitManager.loadSocket()
    SessionCookieHandler.init(InitManager.app)
  }
  static initLoadRouters(): void {
    const whenLoadModule =(obj: any): void => {
      if (obj.default instanceof Router) {
        ConsoleBox.info('路由加载中，请耐心等待。。。')
        InitManager.app.use(obj.default.routes())
      }
    }
    const apiDirectory = `${process.cwd()}/src/api`
    requireDirectory(module, apiDirectory, { visit: whenLoadModule })
  }
  static loadConfig(): void{
    global.config = config
  }
  static loadHttpException(): void{
    global.errs = errors
  }
  static loadHttpStatus(): void {
    global.status = status as  HttpStatus & string
  }
  static loadSocket(): void {
    console.log('loadSocket')
    socketLoader(InitManager.app)
  }
  // session 配置
  // static loadSession(){
  //   InitManager.app.use(session)
  // }


}

export default InitManager