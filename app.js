const infinity = 9999999;
let score, bestIndex, bestScore, value, height;
// Setting scores for wins and ties for players
const scores = {
  X: -1,
  O: 1,
  Tie: 0,
};

const depth = 9;
const human = 'X',
  ai = 'O';

const columns = document.querySelectorAll('.column'),
  winner = document.querySelector('.winner');

let tictactoe = new Array(9),
  result = '',
  turnValue = human;

tictactoe = [null, null, null, null, null, null, null, null, null];

const checkForWin = function (tictactoe) {
  //Checking the columns
  for (let i = 0; i < 3; i++)
    if (
      tictactoe[i] != null &&
      tictactoe[i] === tictactoe[i + 3] &&
      tictactoe[i + 3] === tictactoe[i + 6]
    )
      return true;

  // Checking for Rows
  for (let i = 0; i < 9; i = i + 3)
    if (
      tictactoe[i] != null &&
      tictactoe[i] === tictactoe[i + 1] &&
      tictactoe[i + 1] === tictactoe[i + 2]
    )
      return true;

  // Checking for diagonals
  if (
    tictactoe[0] != null &&
    tictactoe[0] === tictactoe[4] &&
    tictactoe[4] === tictactoe[8]
  )
    return true;

  // Checking for opposite diagonal
  if (
    tictactoe[2] != null &&
    tictactoe[2] === tictactoe[4] &&
    tictactoe[4] === tictactoe[6]
  )
    return true;

  return false;
};

const minimax = function (tictactoe, isMax, height) {
  // console.log(tictactoe);
  let score, bestScore;
  if (checkForDraw(tictactoe)) return 0;
  if (isMax) {
    bestScore = -infinity;
    for (let i = 0; i < 9; ++i) {
      if (tictactoe[i] === null) {
        tictactoe[i] = ai;
        if (checkForWin(tictactoe)) {
          score = 10;
        } else {
          score = minimax(tictactoe, false, height + 1);
        }
        tictactoe[i] = null; // Reverting to the original value
        bestScore = Math.max(score, bestScore);
        // bestIndex = index;
      }
    }
    // console.log(bestScore);
    return bestScore;
  } else {
    bestScore = infinity;
    for (let i = 0; i < 9; ++i) {
      if (tictactoe[i] === null) {
        tictactoe[i] = human;
        if (checkForWin(tictactoe)) {
          score = -10;
          // console.log(`max ${score}`);
        } else {
          score = minimax(tictactoe, true, height + 1);
        }
        // Reverting to the original value
        bestScore = Math.min(score, bestScore);
        tictactoe[i] = null;
      }
    }
    return bestScore;
  }
};

winner.textContent = '';

const checkForDraw = function (tictactoe) {
  for (let i = 0; i < 9; ++i) if (tictactoe[i] === null) return false;
  return true;
};

// Changing the turn value after each click
const changeTurnValue = function () {
  turnValue = turnValue === human ? ai : human;
};

const updateArray = function (index, turnValue) {
  // console.log(index);
  if (tictactoe[index] === null) tictactoe[index] = turnValue;
  for (let i = 0; i < 9; ++i) {
    columns[i].innerHTML = tictactoe[i];
  }
};

const checkFilledCells = function () {
  let count = 0;
  for (let i = 0; i < 9; ++i) if (tictactoe[i] != null) count++;
  return count;
};

const displayResult = function (turnValue) {
  if (checkForWin(tictactoe)) {
    winner.textContent = `${turnValue} Wins`;
    return;
  }
  if (checkForDraw(tictactoe)) {
    winner.textContent = `Game is a Tie`;
    return;
  }
};

const beginGame = function () {
  columns.forEach(function (column, index) {
    column.addEventListener('click', function (e) {
      updateArray(index, human);
      // displayResult(turnValue);
      if (checkForWin(tictactoe)) {
        winner.textContent = `X Wins`;
        return;
      }
      if (checkForDraw(tictactoe)) {
        winner.textContent = `Game is a Tie`;
        return;
      }
      // changeTurnValue();

      let bestScore = -infinity;
      let bestIndex = -1;
      let score;
      for (let i = 0; i < 9; ++i) {
        // let height = checkFilledCells();
        console.log(`height ${height}`);
        if (tictactoe[i] === null) {
          tictactoe[i] = ai;
          score = minimax(tictactoe, false, 0);
          tictactoe[i] = null;
          console.log('score-value ' + score);
        }
        if (score > bestScore) {
          bestScore = score;
          bestIndex = i;
        }
        console.log(`bestindex ${bestIndex}`);
      }
      updateArray(bestIndex, ai);
      checkForWin(tictactoe);
      if (checkForWin(tictactoe)) {
        winner.textContent = `O Wins`;
        return;
      }
      if (checkForDraw(tictactoe)) {
        winner.textContent = `Game is a Tie`;
        return;
      }
      // displayResult(turnValue);
      // changeTurnValue();
      console.log(tictactoe);
    });
  });
};

// console.log(tictactoe);
updateArray();

result = beginGame();
columns.forEach(function (column, index) {
  column.removeEventListener('click', function () {});
});
