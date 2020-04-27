import Koa from 'koa'
import parser from 'koa-bodyparser'


import { InitManager } from './core/init'
import catchError from './middleware/exception'
import cors from 'koa2-cors'
import serve from 'koa-static'
import path from 'path'
import { ApolloServer, gql } from 'apollo-server-koa'
import koaSwagger from 'koa2-swagger-ui'
import { GlobalErrorInterface } from './core/http-exception'
import status from 'http-status'

//
import session, { SessionStore } from 'koa-generic-session'
import redisStore from 'koa-redis'
import config from './config/config'
//

declare global {
  namespace NodeJS {
    interface Global {
      config: any;
      errs: GlobalErrorInterface;
      swagger: any;
      status: status.HttpStatus;
      data: any;
    }
  }
}
if (!global.data) {
  global.data = {}
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
app.use(cors())
app.use(serve(path.join(__dirname, 'public/')))
app.use(catchError)
app.use(parser())
//
app.keys = ['keys', 'keykeys']
app.use(session({
  // key: 'weibo.sid', // cookie name 默认是 `koa.sid`
  // prefix: 'weibo:sess:', // redis key的前缀，默认是`koa:sess:`
  // cookie: {
  //   path: '/',
  //   httpOnly: true, // 客户端不能修改cookie
  //   maxAge: 24 * 60 * 60 * 1000 // ms
  // },
  // ttl: 24 * 60 * 60 * 1000, // redis过期时间，默认和maxAge相同
  store: redisStore({
    // all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    host: config.REDIS_CONF.host,
    port: config.REDIS_CONF.port,
    password: config.REDIS_CONF.password,
    db: 1
  }) as any
}))

//
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
app.listen(3111)
console.log(`server is running on port 3111${server.graphqlPath}`)

