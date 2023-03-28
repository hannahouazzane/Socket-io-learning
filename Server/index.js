const roomMethods = require("./startGame");
const express = require("express");

/// defines the express server? Express.js, or simply Express, is a back end web application framework for building RESTful APIs with Node.js
const app = express();
const cors = require("cors");

app.use(cors);
const http = require("http").createServer(app);

const io = require("socket.io")(http, {
  cors: {
    orign: "*",
  },
});

let roomGameData = [];

io.on("connection", (socket) => {
  console.log("someone has connected!");

  socket.on("send-room", (data) => {
    const roomNumber = data.number;

    // checks how much space is in the selected room
    let numberInRoom = roomMethods.socketsInRoom(roomNumber, io);

    if (numberInRoom < 2) {
      socket.join(roomNumber);

      if (numberInRoom === 1) {
        // adds the second player to the existing room object that is in the roomGameData array
        roomMethods.addSecondPlayer(roomNumber, socket.id, roomGameData);

        //displays the grid now that two players have joined!
        io.to(roomNumber).emit("recieve_message", {
          display_grid: true,
          room: roomNumber,
        });
      }

      if (numberInRoom === 0) {
        // adds the room to the roomGameData array
        roomMethods.addRoomToList(roomNumber, socket.id, roomGameData);
      }
    } else {
      //write some logic here for the ELSE statement!
    }
  });
});

http.listen(3001, () => {
  console.log("I am running and I am updating!");
});
