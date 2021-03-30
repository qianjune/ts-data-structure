/**
 * @description swagger 相关 api
 */
import BaseRouter, {
  get,
  parameter,
  post,
  prefix,
  summary,
  tag,
} from "@src/lib/router-decorator";
import Joi from "joi";
import { Context } from "koa";
import { ResponseHandler } from "@src/utils/responseHandler";
import { ManagerResponseSuccess } from "@src/manager/response";

@prefix("/v2")
@tag("swagger相关")
class SwaggerApi extends BaseRouter {
  @get("/swagger-schema")
  @parameter(Joi.object({}), "query")
  getSwaggerSchema(ctx: Context): void {
    ctx.body = global.swagger.schema;
  }
}
const swaggerApi = new SwaggerApi();
export default swaggerApi.init();
