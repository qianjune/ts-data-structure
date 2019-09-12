import Koa from 'koa'
import parser from 'koa-bodyparser'
import { InitManager } from './core/init'
import catchError from './middleware/exception'
import cors from 'koa2-cors'
import serve from 'koa-static'
import path from 'path'
import { ApolloServer, gql } from 'apollo-server-koa'
import koaSwagger from 'koa2-swagger-ui'

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
InitManager.initCore(app)
app.use(
  koaSwagger({
    routePrefix:'/v1/swagger',
    swaggerOptions:{
      url:'http://localhost:3111/v1/swagger-schema'
    }
  })
)
server.applyMiddleware({app})
app.listen(3111)
console.log(`server is running on port 3111${server.graphqlPath}`)

