import React from "react";

import "../Square/Game.css";

const Square = ({ method, user }) => {
  return (
    <div className="square" onClick={method}>
      {user}
    </div>
  );
};

export default Square;
