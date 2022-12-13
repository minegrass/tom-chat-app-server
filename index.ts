import express from "express";
const app = express();
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("SERVER UP");
});

io.on("connection", (socket) => {
  // console.log(`User connect ${socket.id}`);

  socket.on("join_room", async (data) => {
    // console.log(socket.rooms);
    await socket.join(data.room);
  });
  socket.on("leave_room", (data) => {
    socket.leave(data.room);
  });

  //data:{room,msg,username}
  socket.on("send_msg", (data) => {
    // console.log(data.room);
    socket
      .to(data.room)
      .emit("receive_msg", { msg: data.msg, username: data.username });
  });
});

server.listen(3001, () => {
  console.log("server run");
});
