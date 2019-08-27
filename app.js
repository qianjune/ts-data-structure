import Koa from 'koa'
import { InitManager } from './core/init'

const app = new Koa()
InitManager.initCore(app)
app.listen(3111)
console.log('hello')