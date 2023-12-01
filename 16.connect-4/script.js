const RED = "red";
const YELLOW = "yellow";
const board = document.getElementById("board");
const mat = new Array();
let currentTurn = RED;

for (let i = 1; i <= 6; ++i) {
  const ro = new Array();
  for (let j = 1; j <= 7; ++j) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
    cell.dataset.fill = "";
    ro.push(cell);
  }
  mat.push(ro);
}

board.addEventListener("click", (e) => {
  if (e.target.classList.contains("cell")) {
    let ro = mat.findIndex((row) => row.includes(e.target));
    let col = mat[ro].findIndex((col) => col === e.target);
    let cell = null;
    for (let i = 5; i >= 0; --i) {
      if (mat[i][col].dataset.fill === "") {
        ro = i;
        cell = mat[i][col];
        break;
      }
    }
    if (!cell) {
      return;
    }
    const arr = [...board.children];
    arr.find((row) => {
      if (row === cell) {
        row.classList.add(`filled-${currentTurn}`);
      }
    });

    cell.dataset.fill = currentTurn === RED ? RED : YELLOW;
    mat[ro][col] = cell;
    if (checkForWinner(currentTurn)) {
      declareWinner(currentTurn);
      board.style.opacity = 0.7;
      return;
    }
    swapTurn();
  }
});

// helpers

function swapTurn() {
  if (currentTurn === RED) {
    currentTurn = YELLOW;
  } else {
    currentTurn = RED;
  }
}

function declareWinner(currentTurn) {
  document.getElementById("winner").textContent =
    currentTurn[0].toUpperCase() + currentTurn.slice(1) + " Win's";
}

function checkForWinner(currentTurn) {
  for (let i = 0; i < 6; ++i) {
    for (let j = 0; j < 4; ++j) {
      if (
        mat[i][j]?.dataset?.fill === currentTurn &&
        mat[i][j + 1]?.dataset?.fill === currentTurn &&
        mat[i][j + 2]?.dataset?.fill === currentTurn &&
        mat[i][j + 3]?.dataset?.fill === currentTurn
      ) {
        return true;
      }
    }
  }

  for (let j = 0; j < 7; ++j) {
    for (let i = 0; i < 3; ++i) {
      if (
        mat[i][j]?.dataset?.fill === currentTurn &&
        mat[i + 1][j]?.dataset?.fill === currentTurn &&
        mat[i + 2][j]?.dataset?.fill === currentTurn &&
        mat[i + 3][j]?.dataset?.fill === currentTurn
      ) {
        return true;
      }
    }
  }

  for (let i = 2; i >= 0; --i) {
    for (let j = 0; j < 4; ++j) {
      if (
        mat[i][j]?.dataset?.fill === currentTurn &&
        mat[i + 1][j + 1]?.dataset?.fill === currentTurn &&
        mat[i + 2][j + 2]?.dataset?.fill === currentTurn &&
        mat[i + 3][j + 3]?.dataset?.fill === currentTurn
      ) {
        return true;
      }
    }
  }

  for (let i = 3; i < 6; ++i) {
    for (let j = 0; j < 4; ++j) {
      if (
        mat[i][j]?.dataset?.fill === currentTurn &&
        mat[i - 1][j + 1]?.dataset?.fill === currentTurn &&
        mat[i - 2][j + 2]?.dataset?.fill === currentTurn &&
        mat[i - 3][j + 3]?.dataset?.fill === currentTurn
      ) {
        return true;
      }
    }
  }
}
