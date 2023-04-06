import React from "react";

import "../Square/Game.css";

const Square = ({ sendPlayer, children, id }) => {
  return (
    <div className="square" id={id} onClick={sendPlayer}>
      {children}
    </div>
  );
};

export default Square;
