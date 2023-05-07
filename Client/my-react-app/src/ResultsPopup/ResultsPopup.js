import "./ResultsPopup.css";

export const ResultsPopup = () => {
  return (
    <div id="pop-up" className="game-over-popup" style={{ display: "none" }}>
      <div className="popup-content">
        {" "}
        <div id="gameResult" className="popup-title"></div>
        <button>Play another game</button>
      </div>
    </div>
  );
};
