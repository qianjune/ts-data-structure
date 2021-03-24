import "module-alias/register";
import "reflect-metadata";
import ConsoleBox from "@src/utils/console_box";
import config from "./config/config";
import bootstrap from "./src/graphql/index";
import WebSocketServerBuilder from "./websocket-server/index";
import app from "./app";

const websocketServer = new WebSocketServerBuilder();

bootstrap().then((server) => {
  server.applyMiddleware({ app: app as any });
  const koaServer = app.listen(config.SERVER_CONF.port);
  websocketServer.init(app, koaServer);
  ConsoleBox.info(
    `server is running on port ${config.SERVER_CONF.port}${server.graphqlPath}`
  );
});

// rx 学习
// import './experiment/rx-dev/index'
// 算法
// import './experiment/algorithm/index'
