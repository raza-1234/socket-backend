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

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
}) 