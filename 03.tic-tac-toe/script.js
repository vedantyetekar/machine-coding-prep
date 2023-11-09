let X_TURN = true;
let currentClass = "x";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const board = document.querySelector(".board");
const cellElements = document.querySelectorAll("[data-cell]");
const msg = document.querySelector(".message");
const result = document.querySelector("#result");

startGame();

board.addEventListener("click", (e) => {
  if (e.target.className === "cell") {
    currentClass = X_TURN ? "x" : "o";
    e.target.classList.add(currentClass);
    if (checkWin(currentClass)) {
      console.log(currentClass);
      endGame(currentClass);
    } else if (isDraw()) {
      endGame("draw");
    }
    X_TURN = !X_TURN;
    toggleTurn(X_TURN);
  }
});

function startGame() {
  for (let i = 0; i < cellElements.length; ++i) {
    cellElements[i].classList.remove("x");
    cellElements[i].classList.remove("o");
  }
  board.classList.add("x");
  msg.style.display = "none";
}

function toggleTurn(X_TURN) {
  board.classList.remove("x");
  board.classList.remove("o");
  board.classList.add(X_TURN ? "x" : "o");
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("o");
  });
}

function endGame(currentClass) {
  if (currentClass === "draw") {
    result.innerText = "Draw!";
  } else if (currentClass === "x") {
    result.innerText = "X's Wins";
  } else {
    result.innerText = "O's Wins";
  }
  msg.style.display = "flex";
  const restartBtn = document.querySelector(".restart");
  restartBtn.addEventListener("click", (e) => {
    startGame();
  });
  restartBtn.removeEventListener();
}
