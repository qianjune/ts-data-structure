import Koa, { Context } from 'koa'
import parser from 'koa-bodyparser'


import { InitManager } from './core/init'
import catchError from './middleware/exception'
import cors from 'koa2-cors'
import serve from 'koa-static'
import path from 'path'
import { ApolloServer, gql } from 'apollo-server-koa'
import koaSwagger from 'koa2-swagger-ui'
import { GlobalErrorInterface } from './core/http-exception'
import status, { HttpStatus } from 'http-status'
import SessionCookieHandler from '@src/utils/session_cookie'


declare global {
  namespace NodeJS {
    interface Global {
      config: any;
      errs: GlobalErrorInterface;
      swagger: any;
      status: HttpStatus;
      state: { [keyName: string]: any };
    }
  }
}
if (!global.state) {
  global.state = {}
}
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = new Koa()

app.use(cors({
  origin: function (ctx: Context) { //设置允许来自指定域名请求
    return 'http://local.test.com:3001'; //只允许http://localhost:8080这个域名的请求
  },
  maxAge: 5, //指定本次预检请求的有效期，单位为秒。
  credentials: true, //是否允许发送Cookie
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
}))
SessionCookieHandler.init(app)
app.use(serve(path.join(__dirname, 'public/')))
app.use(catchError)
// app.use(parser({
//   enableTypes: ['json', 'form', 'text']
// }))

InitManager.initCore(app)

app.use(
  koaSwagger({
    routePrefix: '/v1/swagger',
    swaggerOptions: {
      url: 'http://localhost:3111/v1/swagger-schema'
    }
  })
)
server.applyMiddleware({ app: app as any })
export {
  server
}

export default app

