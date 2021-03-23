/**
 * @description 笔记 api
 */

import joi from "@hapi/joi";
import BaseRouter, {
  post,
  parameter,
  get,
  summary,
  del,
  prefix,
  tag,
  middleware,
} from "@src/lib/router-decorator";
import { Context } from "koa";
import NoteService from "@micro-services/social-service/src/services/note";
import ws from "ws";
import { client as WsClient } from "websocket";
import SessionCookieHandler from "@src/utils/session_cookie";
const noteService = new NoteService();

@prefix("/api/note")
@tag("笔记相关服务")
class NoteApi extends BaseRouter {
  /**
   * 创建
   * @param ctx
   */
  @post("/create")
  @summary("笔记创建")
  @parameter(
    joi.object({
      sightMaterials: joi.array().items(
        joi.object({
          url: joi.string().required(),
        })
      ),
      title: joi.string().required(),
      content: joi.string().required(),
      topics: joi.array().items(joi.string().required()),
    }),
    "body"
  )
  async create(ctx: Context): Promise<void> {
    // create item
    const { body } = ctx.request;
    await noteService.create(body);
  }

  /**
   * 获取详情
   * @param ctx
   */
  @get("/detail/:id")
  @summary("笔记详情")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async getInfo(ctx: Context): Promise<void> {
    // get info
    const { id } = ctx.state.parameter;
    await noteService.getInfo(id);
  }

  /**
   * 获取列表
   * @param ctx
   */
  @get("/list")
  @summary("笔记列表")
  @parameter(
    joi.object({
      pageSize: joi.number().required(),
      pageNo: joi.number().required(),
    }),
    "query"
  )
  async getList(ctx: Context): Promise<void> {
    // get list
    const { parameter } = ctx.state;
    await noteService.getList(parameter);
  }

  /**
   * 删除
   * @param ctx
   */
  @del("/:id")
  @summary("删除笔记")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async del(ctx: Context): Promise<void> {
    // del item
    const { id } = ctx.state.parameter;
    await noteService.del(id);
  }

  /**
   * 编辑
   * @param ctx 、
   */
  @post("/edit")
  @summary("笔记编辑")
  @parameter(joi.object({}), "body")
  async edit(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    await noteService.edit(body);
  }

  @post("/websocket")
  @summary("发送单次信息")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(joi.object({}), "body")
  async testWebsocket(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    const client = new WsClient();
    client.on("connect", (connection) => {
      console.log("WebSocket Client Connected");

      function sendNumber() {
        if (connection.connected) {
          console.log("发送");
          const number = Math.round(Math.random() * 0xffffff);
          // connection.sendUTF(number.toString());
          connection.send("sendToClient");
          // setTimeout(sendNumber, 1000);
        }
      }
      sendNumber();
      connection.on("error", function (error) {
        console.log("Connection Error: " + error.toString());
      });
      connection.on("close", function () {
        console.log("echo-protocol Connection Closed");
      });
      connection.on("message", function (message) {
        if (message.type === "utf8") {
          console.log("Received: '" + message.utf8Data + "'");
        }
      });
    });
    client.connect("ws://localhost:3111/test");
  }
}

export default new NoteApi().init();
