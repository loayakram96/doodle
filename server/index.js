const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);
const DOODLE_BOT = "DoodleBot";
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let chatRoom = ""; // Dev, Marketing, ...
let chatUsers = []; // All users in current chat room

// Listen for socket connections
io.on("connection", (socket) => {
  // Socket event listeners should go here
  console.log(`User connected ${socket.id}`);

  // Add a user to a room
  socket.on("join_room", (data) => {
    const { username, room } = data;
    socket.join(room);

    // Send message to users in the room about the user that just joined
    socket.to(room).emit("receive_message", {
      message: `${username} has joined the chat room`,
      username: DOODLE_BOT,
      __createdtime__,
    });

    // Update chat room and users
   chatRoom = room;
   chatUsers.push({ id: socket.id, username, room });
   let chatRoomUsers = chatUsers.filter((user) => user.room === room);
   socket.to(room).emit("chatroom_users", chatRoomUsers);
   socket.emit("chatroom_users", chatRoomUsers);
  });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

server.listen(4000, () => "Server is running on port 4000");
