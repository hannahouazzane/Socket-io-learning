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

function getGameData(room) {
  let gameData = null;
  roomGameData.forEach((i) => {
    if (Object.keys(i)[0] === room) {
      gameData = i[room];
    }
  });

  return gameData;
}

io.on("connection", (socket) => {
  socket.on("send-room", (data) => {
    const roomNumber = data.number;
    const cookie = data.cookie;
    let player = null;
    const checkCookieRoom = () => {
      let checkingRoom = true;
      if (cookie !== null) {
        if (cookie["room"] === roomNumber) {
          checkingRoom = false;
        }
      }

      return checkingRoom;
    };

    // checks how much space is in the selected room
    const numberInRoom = roomMethods.socketsInRoom(roomNumber, io);

    if (numberInRoom < 2 && checkCookieRoom()) {
      socket.join(roomNumber);

      if (numberInRoom === 1) {
        player = getGameData(roomNumber)["secondPlayer"];

        delete getGameData(roomNumber)["secondPlayer"];
        console.log(player);

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
        getGameData(roomNumber)["secondPlayer"] = filterSecondPlayer[0];
      }

      socket.emit("set_cookie", { room: data.number, player: player });
    } else {
      //write some logic here for when the room is FULL!
    }
  });

  socket.on("square_clicked", (data) => {
    let overallGameStaus = null;
    let myCookie = data.cookie;
    let square = data.square;
    let getRoomNumber = myCookie["room"];
    let player = myCookie["player"];
    let gameData = getGameData(getRoomNumber);
    console.log(`testing this works ${player}`);

    if (gameData["game"][data.square] == "_") {
      gameData["game"][data.square] = player;

      overallGameStaus = checkGameStatus.checkResults(player, gameData["game"]);
    }

    // does not like camel casing!

    io.emit("show_play", {
      player: player,
      room: getRoomNumber,
      square: square,
      overallGameStaus: overallGameStaus,
    });
  });
});

http.listen(3001, () => {
  console.log("I am running and I am updating!");
});
