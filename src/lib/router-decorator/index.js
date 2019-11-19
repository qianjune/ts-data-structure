export * from './method'
export * from './middleware'
export * from './parameter'
export * from './prefix'
import Router from 'koa-router'
import { set } from 'lodash'
import baseSchema from '../../lib/swagger/base'
const buildParameters = (parameterGroup) => {
  if(!parameterGroup){
    return []
  }
  const keys = Object.keys(parameterGroup)
  const parameters = []
  keys.forEach(key => {
    const prop = {
      name: key === 'params' ? parameterGroup[key].required[0] : key,
      in: key === 'params' ? 'path' : key,
      schema: parameterGroup[key]
    }
    console.log(prop)
    parameters.push(prop)
  })
  // console.log(parameters)
  return {
    parameters
  }
}

const buildSchema = (prefix, apiData, parameters) => {
  const schema = {
    summary: `${prefix}${apiData.path}`,
    // operationId: '',
    responses: {
      200: {
        description: ""
      }
    },
    tags: [prefix],
    ...parameters
  }
  const result = {}
  result[`${prefix}${apiData.path}`] = {}
  set(result[`${prefix}${apiData.path}`], apiData.method, schema)
  return result
}


class BaseRouter {
  constructor() {
    this.router = new Router({ prefix: this.prefix })
  }
  buildSwaggerJson() {
    let paths = {}
    Object.keys(this.apis).forEach(key => {
      const api = this.apis[key]
      
      const parameters = buildParameters(api.parameter)
      console.log(parameters)
      const schema = buildSchema(this.prefix, api, parameters)
      paths = { ...paths, ...schema }
    })
    // console.log(paths)
    if (!global.swagger) {
      global.swagger = {}
    }
    if (!global.swagger.schema) {
      global.swagger.schema = {}
    }
    baseSchema.paths = { ...baseSchema.paths, ...paths }
    // console.log(baseSchema)
    global.swagger.schema = baseSchema
  }
  init() {
    // this.buildSwaggerJson()
    Object.keys(this.apis).forEach(key => {
      const api = this.apis[key]
      this.router[api.method](api.path, ...(api.middleware || []))
      console.log(api.path)
      console.log(api.middleware)
    })
    console.log(this.router)
    return this.router
  }
}

export default BaseRouter