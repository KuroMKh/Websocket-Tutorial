var WebSocketServer = require("ws").Server;
wss = new WebSocketServer({ port: 1234 });

wss.on("connection", function (ws, req) {
  var ipclient = req.socket.remoteAddress;
  console.log("Connected:" + ipclient);

  ws.on("message", function (msg) {
    if (msg) {
      //console.log(msg.toString());
      wss.clients.forEach((client) => {
        client.send(msg.toString());
      });
    }
  });
});
