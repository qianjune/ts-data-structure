import { registerMiddleware } from './middleware'
import convert from 'joi-to-json-schema'
import joi from '@hapi/joi'
import { cloneDeep } from 'lodash'
const registerSwaggerParameter = (target, key, location, joiSchema) => {
  if (!target.apis[key].parameter) {
    target.apis[key].parameter = {}
  }
  target.apis[key].parameter[location] = convert(joiSchema)
}

/**
 * 设置参数及验证的注解
 * @param {String} name 参数名
 * @param {Objet} joiSchema 验证的模型
 * @param {String} location 取值的位置
 */
const parameter = (name, joiSchema, location) => (target, key, descriptor) => {
  // 判断验证验证的是单个参数还是一个body
  if (typeof name !== 'string') {
    location = joiSchema
    joiSchema = name
    name = null
  }
  let finalSchema = cloneDeep(joiSchema)
  if (name) {
    // 如果同个location的属性单个写，是否要合并在一起
    const objectSchema = {}
    objectSchema[name] = joiSchema
    finalSchema = joi.object(objectSchema)
  }
  // registerSwaggerParameter(target, key, location, finalSchema)
  const joiValiate = async (ctx, next) => {
    // try {
      let parameter = ctx.request[location]
      if (location === 'params') {
        parameter = ctx[location]
      }
      if (name) {
        const objectData = {}
        objectData[name] = parameter[name]
        parameter = objectData
      }
      const result = finalSchema.validate(parameter)
      if (result.error) {
        throw new global.errs.HttpException(result.error.details[0].message)
      }
      await next()
    // }
    // catch (err) {
    //   let finalErr = err
    //   if (Array.isArray(err.details) && err.details.length > 0) {
    //     finalErr = err.details[0].message
    //   }
    //   throw err
      
    // }
  }
  registerMiddleware(target, key, joiValiate)
}

export {
  parameter
}