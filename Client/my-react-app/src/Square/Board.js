import "./Game.css";
import Square from "../Square/Square";
import React, { useEffect } from "react";

import io from "socket.io-client";
import Cookies from "js-cookie";
import { ResultsPopup } from "../ResultsPopup/ResultsPopup";
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
  function changeSquareClickable(change) {
    for (let i = 0; i < 9; i++) {
      console.log("square-" + i.toString());
      document.getElementById("square-" + i.toString()).style.pointerEvents =
        change;
    }
  }
  useEffect(() => {
    socket.on("show_play", (data) => {
      const playerRoom = playerCookie()["room"];
      const squareID = "square-" + data.square.toString();

      if (playerRoom === data.room) {
        document.getElementById(squareID).innerHTML = `<p> ${data.player} </p>`;
        //// if it X's go ... and they've gone, you don't want them clicking around again - so you set the onClick to show up as the Not your go
        //// Now it is O's go, the onClick has already been set to be showing

        if (data.overallGameStaus !== "Continue") {
          changeSquareClickable("none");
          document.getElementById("pop-up").style.display = "flex";
          document.getElementById(
            "gameResult"
          ).innerHTML = `<p> ${data.overallGameStaus} </p>`;
        } else {
          if (playerCookie()["player"] === data.player) {
            for (let i = 0; i < 9; i++) {
              document.getElementById(
                "square-" + i.toString()
              ).style.pointerEvents = "none";
            }
            document.getElementById("board-container").onclick = () => {
              document.getElementById(
                "testing"
              ).innerHTML = `<p> Not your turn!</p>`;
            };
          } else {
            for (let i = 0; i < 9; i++) {
              console.log("square-" + i.toString());
              document.getElementById(
                "square-" + i.toString()
              ).style.pointerEvents = "auto";
            }
            document.getElementById("testing").innerHTML = ``;
            document.getElementById("board-container").onclick = () => {
              document.getElementById("testing").innerHTML = ``;
            };
          }
        }
      }
    });
  });
  return (
    <div id="board-container">
      <ResultsPopup />

      <p id="testing"></p>
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
