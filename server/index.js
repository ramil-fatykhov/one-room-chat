const express = require("express");
const app = express();
const SingleList = require("./messageStorage").default;
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.set("log level", 1);

app.use(express.static("./public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.sockets.on("connection", function(socket) {
  const ID = socket.id.toString().substr(0, 5);
  const time = new Date().toLocaleTimeString();
  socket.json.send({ event: "connected", name: ID, time: time });
  socket.broadcast.json.send({ event: "userJoined", name: ID, time: time });

  socket.on("message", function(msg) {
    const time = new Date().toLocaleTimeString();
    const msgList = new SingleList();
    socket.json.send({ event: "messageSent", name: ID, text: msg, time: time });
    socket.broadcast.json.send({
      event: "messageReceived",
      name: ID,
      text: msg,
      time: time
    });
    msgList.add(msg);
  });

  socket.on("disconnect", function() {
    const time = new Date().toLocaleTimeString();
    io.sockets.json.send({ event: "userSplit", name: ID, time: time });
  });
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
