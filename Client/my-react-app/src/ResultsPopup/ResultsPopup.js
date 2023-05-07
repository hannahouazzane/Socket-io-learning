import "./ResultsPopup.css";
import Cookies from "js-cookie";

export const ResultsPopup = () => {
  const removeCookie = () => {
    Cookies.remove("player-details");
    window.location.reload();
  };
  return (
    <div id="pop-up" className="game-over-popup" style={{ display: "none" }}>
      <div className="popup-content">
        {" "}
        <div id="gameResult" className="popup-title"></div>
        <button onClick={removeCookie}> Return Home </button>
      </div>
    </div>
  );
};
