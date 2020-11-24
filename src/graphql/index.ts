import { ApolloServer, Config, gql } from 'apollo-server-koa'
import fs from 'fs'
import { GraphQLScalarType } from 'graphql'
import { resolve } from 'path'
import allCustomScalars from './scalars/index'
const defaultPath = resolve(__dirname, './components')
const typeDefFileName = 'schema.js'
const resolverFileName = 'resolver.js'
/**
 * Query 用于定义读操作
 * Mutation 用于定义写操作
 * Subscription 用于定义长链接
 * 全局声明 指令 装饰器
 * FIELD_DEFINITION 代表此命令只作用于具体某个字段
 */
const linkSchema = gql`
  scalar Date
  directive @auth on FIELD_DEFINITION

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`

const generateTypeDefsAndResolvers = () => {
  const typeDefs = [linkSchema]
  const resolvers: { [keyName: string]: GraphQLScalarType } = { ...allCustomScalars } // 自定义数据类型

  // 递归 添加 resolver 和 schema
  const _generateAllComponentRecursive = (path = defaultPath) => {
    const list = fs.readdirSync(path)
    list.forEach((item) => {
      const resolverPath = `${path}/${item}`
      const stat = fs.statSync(resolverPath)
      const isDir = stat.isDirectory()
      const isFile = stat.isFile()

      if (isDir) {
        _generateAllComponentRecursive(resolverPath)
      } else if (isFile && item === typeDefFileName) {
        const { schema } = require(resolverPath)
        typeDefs.push(schema)

      } else if (isFile && item === resolverFileName) {
        const resolversPerFile = require(resolverPath)
        Object
          .keys(resolversPerFile).forEach(k => {
            if (!resolvers[k]) resolvers[k] = {}
            resolvers[k] = { ...resolvers[k], ...resolversPerFile[k] }
          })
      }
    })
  }
  _generateAllComponentRecursive()
  return { typeDefs, resolvers }
}


const isProd = process.env.NODE_ENV === 'production'
const apolloServerOptions: Config = {
  ...generateTypeDefsAndResolvers(),
  mocks: false,
  playground: !isProd,
  introspection: !isProd,
  formatError: (error) => {
    return {
      code: error.extensions.code,
      message: error.message
    }
  },
  context: ({ ctx }) => ({ ctx }),
  schemaDirectives: {} // 鉴权指令放这里
}

const server = new ApolloServer({ ...apolloServerOptions })

export default server