var WebSocketServer = require("ws").Server;
// Import the WebSocket server module and extract the Server class from it

wss = new WebSocketServer({ port: 1234 });
// Create a new WebSocket server instance, listening on port 1234

wss.on("connection", function (ws, req) {
  // Listen for connection events on the WebSocket server
  // When a client connects, execute the callback function with the WebSocket object (ws) and request object (req)

  var ipclient = req.socket.remoteAddress;
  // Extract the remote IP address of the client from the request object

  console.log("Connected:" + ipclient);
  // Print a message to the console indicating that a client is connected along with their IP address

  ws.on("message", function (msg) {
    // Listen for message events on the WebSocket connection
    // When a message is received from a client, execute the callback function with the received message (msg)

    if (msg) {
      // Check if the received message is not empty

      wss.clients.forEach((client) => {
        // Iterate through all connected clients

        client.send(msg.toString());
        // Send the received message to each connected client
      });
    }
  });
});
