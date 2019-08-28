import Koa from 'koa'
import parser from 'koa-bodyparser'
import { InitManager } from './core/init'
import catchError from './middleware/exception'

const app = new Koa()
app.use(catchError)
app.use(parser())
InitManager.initCore(app)
app.listen(3111)
console.log('server is running on port 3111')