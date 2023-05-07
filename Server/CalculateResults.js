const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinning(player, gameDataList) {
  let stateWon = false;
  winningPatterns.forEach((i) => {
    let foundPattern = true;
    i.forEach((item) => {
      console.log(gameDataList[item] + ":" + item);
      if (gameDataList[item] !== player) {
        foundPattern = false;
      }
    });

    if (foundPattern) {
      stateWon = foundPattern;
    }
  });
  console.log(stateWon);

  return stateWon;
}

function checkResults(player, gameData) {
  let checkEmptySquares = gameData.includes("_");
  if (checkWinning(player, gameData)) {
    return `Player ${player} won!`;
  } else {
    if (checkEmptySquares) {
      return "Continue";
    } else {
      return "It's a draw";
    }
  }
}

module.exports = { checkResults, checkWinning };
