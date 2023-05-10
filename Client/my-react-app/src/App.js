import "./App.css";
import "./Square/Board";
import { Board } from "./Square/Board";

import io from "socket.io-client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const socket = io.connect("http://localhost:3001");
function App() {
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      console.log(data.display_grid);
      if (data.display_grid) {
        document.getElementById("display-board").style.display = "block";
      }
    });

    socket.on("set_cookie", (data) => {
      console.log("the cookie has been set!");
      let cookieData = { room: data.room, player: data.player };

      Cookies.set("player-details", JSON.stringify(cookieData), { expires: 1 });
    });
  });

  const sendRoom = () => {
    socket.emit("send-room", { number: room });
  };

  function checkingCookieInBrowser() {
    console.log("run!");
    socket.emit("checking-cookie", { cookie: "Hello" });
  }

  return (
    <div className="container">
      <h1>Welcome to Tik tac toe!</h1>
      <label>Join a room</label>
      <input
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      ></input>
      <button onClick={sendRoom}>Send a message</button>

      <div id="display-board" style={{ display: "none" }}>
        <Board />

        <p
          onClick={() => {
            checkingCookieInBrowser();
          }}
        >
          Checking cookie
        </p>

        <div id="tag-id"></div>
      </div>
    </div>
  );
}

export default App;
