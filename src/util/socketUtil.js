import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173'
  }
});
const userList = []

app.use(cors());

io.on("connection", (socket) => {
  // console.log(socket.handshake.query);
  const username = socket.handshake.query.username
  const useravatar = socket.handshake.query.avatar
  if (!username) return

  //判断是否存在userList
  const userInfo = userList.find(user => user.username === username)
  if (userInfo) {
    userInfo.id = socket.id
  } else {
    userList.push({
      username,
      useravatar,
      id: socket.id
    })
  }

  console.log(userList)

  io.emit('online', {
    userList
  })

  socket.on('logout', () => {
    const userInfo = userList.find(user => user.id === socket.id);
    if (userInfo) {
      userList.splice(userList.indexOf(userInfo), 1);
      io.emit('online', {
        userList
      });
    }
  });

  socket.on('send', (data) => {
    const targetSocket = io.sockets.sockets.get(data.targetId);
    console.log(targetSocket)
    const toUser = userList.find(user => user.id === data.targetId)

    targetSocket.emit('receive', {
      fromUser: data.fromUser,
      toUser: toUser.username,
      msg: data.msg,
      dateTime: new Date().getTime()
    })
  })
});

server.listen(8080, () => {
  console.log('ok');
});