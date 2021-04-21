export * from "./method";
export * from "./middleware";
export * from "./parameter";
export * from "./prefix";
export * from "./swagger";
import Router from "koa-router";
import { set } from "lodash";
import baseSchema from "@src/lib/swagger/base";
import { saveConvertData } from "@src/utils/trantor/saveConvertData";
import { joiToObject } from "./joi-to-object";

const buildParameters = (
  parameterGroup: any,
  path: string
): { parameters: any[] } => {
  // if (!parameterGroup) {
  //   return {
  //     parameters: [],
  //   };
  // }
  // const keys = Object.keys(parameterGroup);
  // const parameters: any = [];
  // keys.forEach((key) => {
  //   const prop = {
  //     name: key === "params" ? parameterGroup[key].required[0] : key,
  //     in: key === "params" ? "path" : key,
  //     schema: parameterGroup[key],
  //   };
  //   parameters.push(prop);
  // });
  return {
    parameters: joiToObject(parameterGroup, path),
  };
};

const buildSchema = ({
  prefix,
  apiData,
  parameters,
  consumes,
  produces,
  tag = "",
}: {
  prefix: string;
  tag: string;
  parameters: {};
  consumes?: string[];

  produces: string[];
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
    summary:
      (apiData.swagger && apiData.swagger.summary) ||
      `${prefix}${apiData.path}`,
    // operationId: '',
    responses: {
      200: {
        description: "",
      },
    },
    tags: [tag || prefix],
    ...parameters,
    consumes,
    produces,
  };
  const result: any = {};
  result[`${prefix}${apiData.path}`] = {};
  set(result[`${prefix}${apiData.path}`], apiData.method, schema);
  return result;
};

class BaseRouter {
  apis: {
    [propsName: string]: any;
  };
  router: {
    [propsName: string]: any;
  };
  prefix: string;
  tag: string;
  constructor() {
    this.router = new Router({ prefix: this.prefix });
  }
  buildSwaggerJson() {
    let paths = {};
    this.apis &&
      Object.keys(this.apis).forEach((key) => {
        const api = this.apis[key];
        const parameters = buildParameters(api.parameter, api.path);
        const extraProps: any = {};
        if (
          Array.isArray(parameters) &&
          parameters.length > 0 &&
          parameters[0].in === "body"
        ) {
          extraProps["consumes"] = '["application/json", "application/xml"]';
        }
        const schema = buildSchema({
          prefix: this.prefix,
          apiData: api,
          ...extraProps,
          produces: ["application/xml", "application/json"],
          parameters,
          tag: this.tag,
        });
        if (Object.keys(schema)[0]?.includes("/list")) {
          // console.log(schema["/api/brand/list"].get?.parameters);
          console.log(schema);
          saveConvertData(Object.keys(schema)[0], schema);
        }

        paths = { ...paths, ...schema };
      });
    if (!global.swagger) {
      global.swagger = {};
    }
    if (!global.swagger.schema) {
      global.swagger.schema = {};
    }
    baseSchema.paths = { ...baseSchema.paths, ...paths };
    global.swagger.schema = baseSchema;
  }
  init(name?: string) {
    this.buildSwaggerJson();
    this.apis &&
      Object.keys(this.apis).forEach((key) => {
        const api = this.apis[key];
        this.router[api.method](api.path, ...(api.middleware || []));
      });
    // 路由加载时显示的路由名字
    if (this.tag) {
      this.router.otherProps = { tag: this.tag };
    }
    return this.router;
  }
}

export default BaseRouter;
