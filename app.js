import Koa from 'koa'
import parser from 'koa-bodyparser'
import { InitManager } from './core/init'
import catchError from './middleware/exception'
import cors from 'koa2-cors'
import serve from 'koa-static'
import path from 'path'
const app = new Koa()
app.use(cors())
app.use(serve(path.join(__dirname,'public/')))
app.use(catchError)
app.use(parser())
InitManager.initCore(app)
app.listen(3111)
console.log('server is running on port 3111')