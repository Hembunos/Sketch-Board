const express = require("express"); // Access
const socket = require("socket.io");

const app = express(); //Initialized and server ready

app.use(express.static("public"));

let port = process.env.PORT || 5000;
let server = app.listen(port, () => {
  console.log("Listening to port " + port);
})

let io = socket(server, {
  cors: {
    origin: "https://sketch-board-s0k3.onrender.com",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Made socket connection");
  // Received data
  socket.on("beginPath", (data) => {
    // data -> data from frontend
    // Now transfer data to all connected computers
    io.sockets.emit("beginPath", data);
  })
  socket.on("drawStroke", (data) => {
    io.sockets.emit("drawStroke", data);
  })
  socket.on("redoUndo", (data) => {
    io.sockets.emit("redoUndo", data);
  })
})
