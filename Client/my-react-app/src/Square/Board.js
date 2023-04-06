import "../Square/Game.css";
import Square from "../Square/Square";
import React, { useEffect } from "react";

import io from "socket.io-client";
import Cookies from "js-cookie";
const socket = io.connect("http://localhost:3001");

const playerCookie = () => {
  let cookie = Cookies.get("player-details");
  if (cookie) {
    return JSON.parse(cookie);
  } else {
    return null;
  }
};

const squareClicked = (number) => {
  socket.emit("square_clicked", { square: number, cookie: playerCookie() });
};

export const Board = () => {
  useEffect(() => {
    socket.on("show_play", (data) => {
      const playerRoom = playerCookie()["room"];
      const squareID = "square-" + data.square.toString();

      if (playerRoom === data.room) {
        document.getElementById(squareID).innerHTML = `<p> ${data.player} </p>`;
      }
    });
    socket.on("disable-screen", (data) => {
      console.log("testing to see if this has been recieved!");
      if (data.disable_screen_check) {
        console.log("is this detecting the disabling");
        document.getElementById("board-container").onclick = () => {
          alert("It is not your turn!");
        };

        document.getElementById("board").style.pointerEvents = "none";
      }
    });
  });
  return (
    <div className="board-container">
      <div id="board" className="board">
        <div className="row">
          <Square
            id={"square-0"}
            sendPlayer={() => {
              squareClicked(0);
            }}
          />
          <Square
            id={"square-1"}
            sendPlayer={() => {
              squareClicked(1);
            }}
          />
          <Square
            id={"square-2"}
            sendPlayer={() => {
              squareClicked(2);
            }}
          />
        </div>

        <div className="row">
          <Square
            id={"square-3"}
            sendPlayer={() => {
              squareClicked(3);
            }}
          />
          <Square
            id={"square-4"}
            sendPlayer={() => {
              squareClicked(4);
            }}
          />
          <Square
            id={"square-5"}
            sendPlayer={() => {
              squareClicked(5);
            }}
          />
        </div>

        <div className="row">
          <Square
            id={"square-6"}
            sendPlayer={() => {
              squareClicked(6);
            }}
          />
          <Square
            id={"square-7"}
            sendPlayer={() => {
              squareClicked(7);
            }}
          />
          <Square
            id={"square-8"}
            sendPlayer={() => {
              squareClicked(8);
            }}
          />
        </div>
      </div>
    </div>
  );
};
