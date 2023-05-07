const roomMethods = require("./startGame");
const checkGameStatus = require("./CalculateResults");
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
let player = "";
let storeSecondPlayer = "";

io.on("connection", (socket) => {
  console.log("someone has connected!");

  socket.on("send-room", (data) => {
    const roomNumber = data.number;

    // checks how much space is in the selected room
    let numberInRoom = roomMethods.socketsInRoom(roomNumber, io);

    if (numberInRoom < 2) {
      socket.join(roomNumber);

      if (numberInRoom === 1) {
        player = storeSecondPlayer;
        //displays the grid now that two players have joined!
        io.to(roomNumber).emit("recieve_message", {
          display_grid: true,
          room: roomNumber,
        });
      }

      if (numberInRoom === 0) {
        // adds the room to the roomGameData array
        roomMethods.addRoomToList(roomNumber, roomGameData);
        const playerOptions = ["X", "O"];
        // randomly assigns the first player who joins the room to either X or O
        player =
          playerOptions[Math.floor(Math.random() * playerOptions.length)];
        // stores the second player type in a global variable so that it can be assigned once the second player joins
        let filterSecondPlayer = playerOptions.filter((element) => {
          return element !== player;
        });
        storeSecondPlayer = filterSecondPlayer[0];
      }

      socket.emit("set_cookie", { room: data.number, player: player });
    } else {
      //write some logic here for when the room is FULL!
    }
  });

  socket.on("square_clicked", (data) => {
    let myCookie = data.cookie;
    console.log(roomGameData);

    let gameData = null;
    let overallGameStaus = null;
    // get the room number
    let getRoomNumber = myCookie["room"];
    let square = data.square;

    let player = myCookie["player"];

    let checking = roomGameData.forEach((i) => {
      if (Object.keys(i)[0] === getRoomNumber) {
        gameData = i[getRoomNumber];
      }
    });

    if (gameData["game"][data.square] == "_") {
      console.log(`get the number of the square! ${data.square}`);
      gameData["game"][data.square] = player;
      console.log(gameData["game"][data.square]);

      overallGameStaus = checkGameStatus.checkResults(player, gameData["game"]);
      console.log(overallGameStaus);
    }

    console.log(player);

    // does not like camel casing!

    io.emit("show_play", {
      player: player,
      room: getRoomNumber,
      square: square,
      overallGameStaus: overallGameStaus,
    });
  });

  socket.on("checking-cookie", (data) => {
    console.log(data);

    io.emit("cookie-event", { name: "Hannah" });
  });
});

http.listen(3001, () => {
  console.log("I am running and I am updating!");
});
