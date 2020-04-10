import Router from 'koa-router'
import requireDirectory from 'require-directory'
import redisStore from 'koa-redis'
import status from 'http-status'
import config from '../config/config'
import errors from './http-exception'
import socketLoader from './socket'

export class InitManager {
  static initCore(app) {
    InitManager.app = app
    InitManager.loadConfig()
    InitManager.initLoadRouters()
    InitManager.loadHttpException()
    InitManager.loadHttpStatus()
    InitManager.loadSocket()
  }
  static initLoadRouters() {
    const whenLoadModule = (obj) => {
      if (obj.default instanceof Router) {
        console.log(obj.default.routes)
        InitManager.app.use(obj.default.routes())
      }
    }
    const apiDirectory = `${process.cwd()}/src/api`
    requireDirectory(module, apiDirectory, { visit: whenLoadModule })
  }
  static loadConfig() {
    global.config = config
  }
  static loadHttpException() {
    global.errs = errors
  }
  static loadHttpStatus() {
    global.status = status
  }
  static loadSocket() {
    console.log('loadSocket')
    socketLoader(InitManager.app)
  }
  // session 配置
  // static loadSession(){
  //   InitManager.app.use(session)
  // }


}

export default InitManager