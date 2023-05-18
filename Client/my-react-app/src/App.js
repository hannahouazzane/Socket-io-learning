import "./App.css";
import "./Square/Board";
import { Board } from "./Square/Board";

import io from "socket.io-client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const socket = io.connect("http://localhost:3001");
function App() {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    window.addEventListener("unload", testingUnload);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };
  const testingUnload = () => {
    Cookies.remove("player-details");
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      if (data.display_grid) {
        document.getElementById("display-board").style.display = "block";
      }
    });

    socket.on("set_cookie", (data) => {
      console.log("the cookie has been set!");
      let cookieData = {
        room: data.room,
        player: data.player,
        name: data.name,
      };

      Cookies.set("player-details", JSON.stringify(cookieData), { expires: 7 });
    });
  });

  const sendPlayerInfo = (e) => {
    e.preventDefault();
    if (Cookies.get("player-details")) {
      console.log("You have already requested to join a room.");
    }

    socket.emit("send-room", { number: room, name: name });
  };

  return (
    <div className="container">
      <h1>Welcome to Tik tac toe!</h1>
      <form
        onSubmit={(e) => {
          sendPlayerInfo(e);
        }}
      >
        <label>Please enter your name</label>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <label>Join a room</label>
        <input
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        ></input>

        <button type="submit">Send a message</button>
      </form>

      <div id="display-board" style={{ display: "none" }}>
        <h2 id="player-turn"> </h2>
        <Board />
      </div>
    </div>
  );
}

export default App;
