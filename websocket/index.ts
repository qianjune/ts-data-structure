/**
 * @description websocket 服务监听
 */

import url from "url";
import { Server } from "http";
import ws from "ws";
import Koa from "koa";
import config from "@root/config/config";
import { get } from "@root/cache/_redis";

const WebSocketServer = ws.Server;

interface WsActionParams {
  wss: ws.Server & {
    [keyName: string]: any;
  };
  wsServer: ws & { [keyName: string]: any };
}

const parseUser = async (cookieStr: string) => {
  if (!cookieStr) {
    return;
  }
  if (cookieStr.includes(config.SESSION.key)) {
    const cookieArr = cookieStr.split(";");
    const matchedCookie = cookieArr.find((cookie) =>
      cookie.includes(config.SESSION.key)
    );
    const replacedKey = matchedCookie.replace(
      `${config.SESSION.key}=`,
      `${config.SESSION.prefix}`
    );
    const sessionSavedValue = await get(replacedKey);
    if (!sessionSavedValue) {
      return;
    }
    console.log(sessionSavedValue?.userInfo, "sessionSavedValue");
    const userInfo = sessionSavedValue?.userInfo;
    if (userInfo) {
      try {
        console.log(`User: ${userInfo.mobile}, ID: ${userInfo.id}`);
        return userInfo;
      } catch (e) {
        // ignore
      }
    }
  }
};

let messageIndex = 0;

const createMessage = (type: string, user: any, data: any) => {
  messageIndex++;
  return JSON.stringify({
    id: messageIndex,
    type,
    user,
    data,
  });
};

const onConnect = (params: WsActionParams) => {
  const { wsServer, wss } = params;
  const user = wsServer.user;
  const msg = createMessage("join", user, `${user.mobile} joined.`);
  wss.broadcast(msg);
  // build user list:
  const users = [...wss.clients].map((client: any) => {
    return client.user;
  });
  wsServer.send(createMessage("list", user, users));
};

const onMessage = (params: WsActionParams, message: string) => {
  const { wsServer, wss } = params;
  console.log(message);
  if (message && message.trim()) {
    const msg = createMessage("chat", wsServer.user, message.trim());
    wss.broadcast(msg);
  }
};

const onClose = (params: WsActionParams) => {
  const { wsServer, wss } = params;
  const user = wsServer.user;
  const msg = createMessage("left", user, `${user.mobile} is left.`);
  wss.broadcast(msg);
};

class WebSocketServerBuilder {
  wss: ws.Server & {
    [keyName: string]: any;
  };
  _createWebSocketServer(
    server: Server,
    onConnection: (params: WsActionParams) => void = () => {
      console.log("[WebSocket] connected.");
    },
    onMessage: (params: WsActionParams, m: any) => void = (msg) => {
      console.log("[WebSocket] message received: " + msg);
    },
    onClose: (params: WsActionParams, code: number, message: any) => void = (
      code,
      message
    ) => {
      console.log(`[WebSocket] closed: ${code} - ${message}`);
    },
    onError: (params: WsActionParams, err: any) => void = (err) => {
      console.log("[WebSocket] error: " + err);
    }
  ): any {
    this.wss = new WebSocketServer({
      server,
    });

    this.wss.broadcast = (data: any) => {
      this.wss.clients.forEach((client) => {
        client.send(data);
      });
    };

    this.wss.on(
      "connection",
      async (wsServer: ws & { [keyName: string]: any }, request) => {
        console.log(request.url, request.headers.cookie, "wsServer.url...");
        const location = url.parse(request.url, true);
        console.log("[WebSocketServer] connection: " + location.href);

        const user = await parseUser(request.headers.cookie);
        if (!user) {
          wsServer.close(4001, "Invalid user");
        }
        wsServer.user = user;
        wsServer.wss = this.wss;
        wsServer.on("message", (_: any, data: any) => {
          onMessage({ wsServer, wss: this.wss }, data);
        });
        wsServer.on("close", (_: any, code: number, reason: string) => {
          onClose({ wsServer, wss: this.wss }, code, reason);
        });
        wsServer.on("error", onError);
        if (location.pathname !== "/test") {
          // close ws:
          wsServer.close(4000, "Invalid URL");
        }
        // check user:

        onConnection({ wsServer, wss: this.wss });
      }
    );
    console.log("WebSocketServer was attached.");
    return this.wss;
  }
  init(app: Koa & { [keyName: string]: any }, server: Server) {
    app.wss = this._createWebSocketServer(
      server,
      onConnect,
      onMessage,
      onClose
    );
    console.log(`websocket started at port ${config.port}...`);
  }
}

export default WebSocketServerBuilder;
