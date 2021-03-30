// import convert from 'joi-to-json-schema'
import joi, { ArraySchema, ObjectSchema } from "joi";
import { cloneDeep } from "lodash";
import { Context } from "koa";
import { registerMiddleware } from "./middleware";
import { joiToObject } from "./joi-to-object";
// const registerSwaggerParameter = (target, key, location, joiSchema) => {
//   if (!target.apis[key].parameter) {
//     target.apis[key].parameter = {}
//   }
//   target.apis[key].parameter[location] = convert(joiSchema)
// }

// enum ParamsType={

export enum ParameterType {
  BODY = "body",
  PARAMS = "params",
  QUERY = "query",
}

// }

/**
 * 设置参数及验证的注解
 * @param {String} name 参数名
 * @param {Objet} joiSchema 验证的模型
 * @param {String} location 取值的位置
 */
const parameter = (
  name: string | ObjectSchema | ArraySchema,
  joiSchema: any,
  location?: ParameterType.BODY | ParameterType.PARAMS | ParameterType.QUERY
) => (target: any, key: string, descriptor: any) => {
  // 判断验证验证的是单个参数还是一个body
  if (typeof name !== "string") {
    location = joiSchema;
    joiSchema = name;
    name = null;
  }
  let finalSchema = cloneDeep(joiSchema) as ObjectSchema;
  if (name) {
    // 如果同个location的属性单个写，是否要合并在一起
    const objectSchema: any = {};
    objectSchema[name as string] = joiSchema;
    finalSchema = joi.object(objectSchema);
  }
  const handleSwaggerParameter = () => {
    // 需要后续处理把Joi转换成JSON
    if (!target.apis) {
      target.apis = {};
    }
    if (!target.apis[key]) {
      target.apis[key] = {};
    }

    target.apis[key].parameter = {
      schema: finalSchema,
      type: location,
    };
  };

  handleSwaggerParameter();

  // registerSwaggerParameter(target, key, location, finalSchema)
  const joiValiate = async (ctx: Context, next: any): Promise<void> => {
    // try {
    let parameter;
    if (location === "params") {
      parameter = ctx[location];
    }
    console.log("params:", parameter);
    if (location === "body" || location === "query") {
      parameter = (ctx.request as any)[location];
    }
    if (name) {
      const objectData: any = {};
      objectData[name as string] = parameter[name as string];
      parameter = objectData;
    }
    const result = finalSchema.validate(parameter, { convert: true });
    console.log(result);
    if (result.error) {
      throw new global.errs.HttpException(result.error.details[0].message);
    }
    ctx.state.parameter = { ...result.value };
    await next();
    // }
    // catch (err) {
    //   let finalErr = err
    //   if (Array.isArray(err.details) && err.details.length > 0) {
    //     finalErr = err.details[0].message
    //   }
    //   throw err

    // }
  };

  registerMiddleware(target, key, joiValiate);
};

export { parameter };
