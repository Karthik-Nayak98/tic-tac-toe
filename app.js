const ROW = 3,
  COL = 3;

const columns = document.querySelectorAll('.column'),
  winner = document.querySelector('.winner');

let turnValue = 'O',
  matrix = new Array(ROW);

for (let i = 0; i < COL; ++i) matrix[i] = ['', '', ''];

console.log(matrix);

const checkForWin = function () {
  let initial = matrix[ROW - 1][COL - 1];

  //Checking the columns
  for (let i = 0; i < COL; ++i) {
    const initial = matrix[i][i];
    let flag = 1;
    for (let j = 0; j < ROW; ++j) {
      if (initial != matrix[j][i] && initial.length == 0) {
        flag = 0;
        break;
      }
    }
    if (flag == 1) {
      return true;
    }
  }

  //Checking the rows
  for (let i = 0; i < ROW; ++i) {
    const initial = matrix[i][i];
    let flag = 1;
    for (let j = 0; j < COL; ++j) {
      if (initial != matrix[i][j] && initial.length == 0) {
        flag = 0;
        break;
      }
    }
    if (flag == 1) {
      return true;
    }
  }

  let flag;
  // Checking the diagonal;
  for (let i = 0; i < ROW; ++i) {
    flag = 1;
    for (let j = 0; j < COL; ++j) {
      if (i == j && matrix[i][j] === initial && initial.length == 0) {
        flag = 0;
        break;
      }
    }
    if (flag == 0) break;
  }
  if ((flag = 1)) return true;

  // if (initial.length != 0 && matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2])
  //     return true;

  initial = matrix[0][2];
  //Checking the opposite diagonal
  if (
    initial.length != 0 &&
    initial === matrix[0][2] &&
    matrxix[0][2] === matrix[1][1] &&
    matrix[1][1] === matrix[2][0]
  )
    return true;

  return false;
};

// Changes the turn value after each click
const changeTurnValue = function () {
  if (turnValue === 'X') turnValue = 'O';
  else turnValue = 'X';
};

const updateMatrix = function (row, col, turnValue) {
  matrix[row][col] = turnValue;
  console.log(matrix);
};

columns.forEach(function (column) {
  column.addEventListener('click', function (e) {
    const value = e.target.dataset.value;
    if (column.textContent.length === 0) column.textContent = turnValue;
    row = Math.floor(value / 10);
    col = value % 10;
    updateMatrix(row, col, turnValue);
    const bool = checkForWin();
    console.log(bool);
    if (bool) winner.textContent = `${turnValue} Wins`;

    changeTurnValue();
  });
});
