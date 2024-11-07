const Express = require("express");
const app = Express();
const cors = require("cors");
const { Server } = require('socket.io');
const http = require('http');
require('dotenv').config();

app.use(cors());

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

io.on("connection", (socket) => {
  socket.on("join_room_space", (data) => {
    socket.join(data)
  })

  socket.on("send-user-message", (data) => {
    io.to(data.room).emit('recieved-message', data.message)
  })
})

const port = process.env.PORT;

httpServer.listen(port, () => {
  console.log(`server is running on port ${port}`)
}) 