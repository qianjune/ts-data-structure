export * from './method'
export * from './middleware'
export * from './parameter'
export * from './prefix'
export * from './swagger'
import Router from 'koa-router'
import { set } from 'lodash'
import baseSchema from '@src/lib/swagger/base'


const buildParameters = (parameterGroup: any): { parameters: [] } => {
  if (!parameterGroup) {
    return {
      parameters: []
    }
  }
  const keys = Object.keys(parameterGroup)
  console.log('keys:',keys)
  const parameters: any = []
  keys.forEach(key => {
    const prop = {
      name: key === 'params' ? parameterGroup[key].required[0] : key,
      in: key === 'params' ? 'path' : key,
      schema: parameterGroup[key]
    }
    parameters.push(prop)
  })
  return {
    parameters
  }
}

const buildSchema = ({ prefix, apiData, parameters, tag = '' }: {
  prefix: string;
  tag: string;
  parameters: {};
  apiData: {
    method: string;
    path: string;
    swagger: {
      summary: string;
    };
  };
}): any => {
  const schema = {
    // 设置api的描述
    summary: apiData.swagger && apiData.swagger.summary || `${prefix}${apiData.path}`,
    // operationId: '',
    responses: {
      200: {
        description: ""
      }
    },
    tags: [tag || prefix],
    ...parameters
  }
  const result: any = {}
  result[`${prefix}${apiData.path}`] = {}
  set(result[`${prefix}${apiData.path}`], apiData.method, schema)
  return result
}


class BaseRouter {
  apis: {
    [propsName: string]: any;
  }
  router: {
    [propsName: string]: any;
  }
  prefix: string
  tag: string
  constructor() {
    this.router = new Router({ prefix: this.prefix })
  }
  buildSwaggerJson() {
    let paths = {}
    this.apis && Object.keys(this.apis).forEach(key => {
      const api = this.apis[key]
      const parameters = buildParameters(api.parameter)
      const schema = buildSchema({ prefix: this.prefix, apiData: api, parameters, tag: this.tag })
      paths = { ...paths, ...schema }
    })
    if (!global.swagger) {
      global.swagger = {}
    }
    if (!global.swagger.schema) {
      global.swagger.schema = {}
    }
    baseSchema.paths = { ...baseSchema.paths, ...paths }
    global.swagger.schema = baseSchema
  }
  init(name?: string) {
    this.buildSwaggerJson()
    this.apis && Object.keys(this.apis).forEach(key => {
      const api = this.apis[key]
      this.router[api.method](api.path, ...(api.middleware || []))

    })
    return this.router
  }
}

export default BaseRouter