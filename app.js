const INFINITY = 9999999,
  HUMAN = 'X',
  COMPUTER = 'O';

const columns = document.querySelectorAll('.column'),
  winner = document.querySelector('.winner');

// Setting scores for wins and ties for players
const scores = {
  X: -10,
  O: 10,
};

let board = new Array(9).fill(null),
  turnValue = HUMAN;

const checkForWin = function (board) {
  //Checking the columns
  for (let i = 0; i < 3; i++)
    if (
      board[i] != null &&
      board[i] === board[i + 3] &&
      board[i] === board[i + 6]
    )
      return true;

  // Checking for Rows
  for (let i = 0; i < 9; i = i + 3)
    if (
      board[i] != null &&
      board[i] === board[i + 1] &&
      board[i] === board[i + 2]
    )
      return true;

  // Checking for diagonals
  if (board[0] != null && board[0] === board[4] && board[4] === board[8])
    return true;

  // Checking for opposite diagonal
  if (board[2] != null && board[2] === board[4] && board[4] === board[6])
    return true;
  return false;
};

const minimax = function (board, isMax, height) {
  let score, bestScore;

  if (checkForWin(board)) return scores[turnValue];
  if (checkForDraw(board)) return 0;

  if (isMax) {
    bestScore = -INFINITY;
    for (let i = 0; i < 9; ++i)
      if (board[i] === null) {
        board[i] = COMPUTER;
        if (checkForWin(board)) {
          score = 10 - height; // Subtracting height will reduce the steps to win
        } else {
          score = minimax(board, false, height + 1);
        }
        board[i] = null; // Reverting to the original value
        bestScore = Math.max(score, bestScore);
      }
  } else {
    bestScore = INFINITY;
    for (let i = 0; i < 9; ++i)
      if (board[i] === null) {
        board[i] = HUMAN;
        if (checkForWin(board)) {
          score = -10 + height;
        } else {
          score = minimax(board, true, height + 1);
        }
        // Reverting to the original value
        bestScore = Math.min(score, bestScore);
        board[i] = null;
      }
  }
  return bestScore;
};

winner.textContent = '';

const checkForDraw = function (board) {
  for (let i = 0; i < 9; ++i) if (board[i] === null) return false;
  return true;
};

// Changing the turn value after each click
const changeTurnValue = function () {
  turnValue = turnValue === HUMAN ? COMPUTER : HUMAN;
};

const updateArray = function (index, turnValue) {
  if (board[index] === null) board[index] = turnValue;
  for (let i = 0; i < 9; ++i) {
    columns[i].innerHTML = board[i];
  }
};

// Removing the eventListener for columns
const removeListener = function () {
  columns.forEach(function (column, index) {
    let new_column = column.cloneNode(true); // creating the clone of the existing node.
    column.parentNode.replaceChild(new_column, column);
  });
};

// Display winner or tie
const displayResult = function (turnValue) {
  if (checkForWin(board)) {
    winner.textContent = `${turnValue} Wins`;
    removeListener();
    return true;
  }
  if (checkForDraw(board)) {
    winner.textContent = `Game is a Tie`;
    removeListener();
    return;
  }
  changeTurnValue();
};

const beginGame = function () {
  columns.forEach(function (column, index) {
    column.addEventListener('click', function (e) {
      let bestScore = -INFINITY,
        bestIndex = -1,
        score;

      updateArray(index, HUMAN);
      console.log(displayResult(turnValue));

      for (let i = 0; i < 9; ++i) {
        if (board[i] === null) {
          board[i] = COMPUTER;
          score = minimax(board, false, 0);
          board[i] = null;
        }
        if (score > bestScore) {
          bestScore = score;
          bestIndex = i;
        }
      }
      updateArray(bestIndex, COMPUTER);
      checkForWin(board);
      displayResult(turnValue);
    });
  });
};

updateArray();
result = beginGame();
