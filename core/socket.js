import IO from "koa-socket-2";

// todolist
// jwt
// router循环注入

const io = new IO();

const socketLoader = (app) => {
  io.attach(app);
  io.on("connection", (ctx) => {
    console.log("Join event", ctx.id);
    io.broadcast("connections", {
      numConnections: io.connections.size,
    });

    ctx.on("disconnect", () => {
      console.log("leave event", ctx.id);
      io.broadcast("connections", {
        numConnections: io.connections.size,
      });
    });
  });
  //
  io.on("data", (ctx, data) => {
    console.log("data event", data);
    ctx.socket.emit("response", {
      message: "response from server",
    });
  });
};

export default socketLoader;
