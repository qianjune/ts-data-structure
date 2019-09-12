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

const parameter = (name, joiSchema, location) => (target, key, descriptor) => {
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
  registerSwaggerParameter(target, key, location, finalSchema)
  const joiValiate = async (ctx, next) => {
    try {
      let parameter = ctx.request[location]
      if (location === 'params') {
        parameter = ctx[location]
      }
      if (name) {
        const objectData = {}
        objectData[name] = parameter[name]
        parameter = objectData
      }
      await finalSchema.validate(parameter)
      // if (result.error) {
      //   throw new global.errs.HttpException(result.error.msg.details.message)
      // }
      await next()
    }
    catch (err) {
      let finalErr = err
      if (Array.isArray(err.details) && err.details.length > 0) {
        finalErr = err.details[0].message
      }
      throw new global.errs.HttpException(finalErr)
    }
  }
  registerMiddleware(target, key, joiValiate)
}

export {
  parameter
}