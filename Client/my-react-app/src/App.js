import "./App.css";
import "./Square/Board";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { Board } from "./Square/Board";

const socket = io.connect("http://localhost:3001");
function App() {
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      console.log(data.display_grid);
      if (data.display_grid) {
        document.getElementById("display").style.display = "block";
      }
    });
  });

  const sendRoom = () => {
    socket.emit("send-room", { number: room });
  };

  return (
    <div>
      <label>Join a room</label>
      <input
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      ></input>
      <button onClick={sendRoom}>Send a message</button>

      <div id="display" style={{ display: "none" }}>
        <Board />
      </div>
    </div>
  );
}

export default App;
