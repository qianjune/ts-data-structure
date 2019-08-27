import Router from 'koa-router'
import requireDirectory from 'require-directory'
import config from '../config/config'

export class InitManager {
  static initCore(app) {
    InitManager.app = app
    InitManager.loadConfig()
    InitManager.initLoadRouters()
  }
  static initLoadRouters() {
    const whenLoadModule = (obj) => {
      if (obj.default instanceof Router) {
        InitManager.app.use(obj.default.routes())
      }
    }
    const apiDirectory = `${process.cwd()}/src/api`
    requireDirectory(module, apiDirectory, { visit: whenLoadModule })
  }
  static loadConfig() {
    global.config = config
  }
}

export default InitManager