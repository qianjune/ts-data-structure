export * from './method'
export * from './middleware'
export * from './parameter'
export * from './prefix'
import Router from 'koa-router'
import { set } from 'lodash'
import baseScheme from '../../lib/swagger/base'
const buildParameters = (parameterGroup) => {
  const keys = Object.keys(parameterGroup)
  const parameters = []
  keys.forEach(key => {
    const prop = {
      name: key === 'params' ? parameterGroup[key].required[0] : key,
      in: key === 'params' ? 'path' : key,
      scheme: parameterGroup[key]
    }
    console.log(prop)
    parameters.push(prop)
  })
  // console.log(parameters)
  return {
    parameters
  }
}

const buildScheme = (prefix, apiData, parameters) => {
  const scheme = {
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
  set(result[`${prefix}${apiData.path}`], apiData.method, scheme)
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
      // console.log(api)
      const parameters = buildParameters(api.parameter)
      const scheme = buildScheme(this.prefix, api, parameters)
      paths = { ...paths, ...scheme }
    })
    // console.log(paths)
    if (!global.swagger) {
      global.swagger = {}
    }
    if (!global.swagger.scheme) {
      global.swagger.scheme = {}
    }
    baseScheme.paths = { ...baseScheme.paths, ...paths }
    // console.log(baseScheme)
    global.swagger.scheme = baseScheme
  }
  init() {
    this.buildSwaggerJson()
    Object.keys(this.apis).forEach(key => {
      const api = this.apis[key]
      this.router[api.method](api.path, ...(api.middleware || []))
    })
    return this.router
  }
}

export default BaseRouter