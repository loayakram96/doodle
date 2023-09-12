const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

app.use(cors());

const harperSaveMessage = require("./services/harper-save-message");
const harperGetMessages = require("./services/harper-get-messages");
const leaveRoom = require("./utils/leave-room");
const server = http.createServer(app);
const DOODLE_BOT = "DoodleBot";

let chatRoom = ""; // Dev, Marketing, ...
let chatUsers = []; // All users in current chat room

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Listen for socket connections
io.on("connection", (socket) => {
  // Socket event listeners should go here
  console.log(`User connected ${socket.id}`);

  let __createdtime__ = Date.now(); // Current timestamp

  // Add a user to a room
  socket.on("join_room", (data) => {
    const { username, room } = data;
    socket.join(room);

    harperGetMessages.getAllMessages(room, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log("result", result.data);
        socket.emit("last_messages", result.data);
      }
    });

  // Send message to all users in the room except the user that just joined
  socket.to(room).emit("receive_message", {
    message: `${username} has joined the chat room`,
    username: DOODLE_BOT,
    __createdtime__,
  });

  // Send message to the user that just joined
  socket.emit("receive_message", {
    message: `Welcome ${username}`,
    username: DOODLE_BOT,
    __createdtime__,
  });

  socket.on("send_message", (data) => {
    const { message, username, room } = data;
    console.log("data", data);
    io.in(room).emit("receive_message", data); // Send to all users in room, including sender
    harperSaveMessage.addMessage(username, message, room);
  });

  socket.on("leave_room", (data) => {
    const { username, room } = data;
    socket.leave(room);
    const __createdtime__ = Date.now();
    socket.removeAllListeners("send_message");
    chatUsers = leaveRoom(socket.id, chatUsers);
    socket.to(room).emit("chatroom_users", chatUsers);
    socket.to(room).emit("receive_message", {
      username: DOODLE_BOT,
      message: `${username} has left the chat`,
      __createdtime__,
    });
    console.log(`${username} has left the chat`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected from the chat");
    const user = chatUsers.find((user) => user.id == socket.id);
    if (user?.username) {
      chatUsers = leaveRoom(socket.id, chatUsers);
      socket.to(chatRoom).emit("chatroom_users", chatUsers);
      socket.to(chatRoom).emit("receive_message", {
        message: `${user.username} has disconnected from the chat.`,
      });
    }
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
