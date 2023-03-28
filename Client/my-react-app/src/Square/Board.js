import "../Square/Game.css";
import Square from "../Square/Square";
import React from "react";
import { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

//when the board is clicked emit it back to the room with the index of the square , and then change the id of the square
// if the board already has one then return an alert to that room - or you can store it in the useState for room [20]

const squareClicked = (number) => {
  socket.emit("square_clicked", number);
};

export const Board = () => {
  return (
    <div className="board">
      <div className="row">
        <Square />
        <Square />
        <Square />
      </div>

      <div className="row">
        <Square />
        <Square />
        <Square />
      </div>

      <div className="row">
        <Square />
        <Square />
        <Square />
      </div>
    </div>
  );
};
