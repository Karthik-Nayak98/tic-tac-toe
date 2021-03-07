const [ROW, COL] = [3, 3];

const columns = document.querySelectorAll('.column'),
  winner = document.querySelector('.winner');

let turnValue = 'O',
  matrix = new Array(ROW);

for (let i = 0; i < COL; ++i) matrix[i] = ['', '', ''];

winner.textContent = ' ';

const checkForDraw = function () {
  for (let i = 0; i < ROW; ++i) {
    for (let j = 0; j < COL; ++j) if (matrix[i][j] === '') return false;
  }
  return true;
};

const checkForWin = function () {
  //Checking the columns
  for (let i = 0; i < COL; ++i) {
    const initial = matrix[i][i];
    let flag = true;
    for (let j = 0; j < ROW; ++j)
      if (initial != matrix[j][i] || initial.length == 0) {
        flag = false;
        break;
      }
    if (flag) return true;
  }

  //Checking the rows
  for (let i = 0; i < ROW; ++i) {
    const initial = matrix[i][i];
    let flag = true;
    for (let j = 0; j < COL; ++j)
      if (initial != matrix[i][j] || initial.length == 0) {
        flag = false;
        break;
      }
    if (flag) return true;
  }

  let initial = matrix[ROW - 1][COL - 1];
  // Checking the diagonal;
  if (
    initial.length != 0 &&
    initial === matrix[0][0] &&
    matrix[0][0] === matrix[1][1] &&
    matrix[1][1] === matrix[2][2]
  )
    return true;

  initial = matrix[0][2];
  //Checking the opposite diagonal
  if (
    initial.length != 0 &&
    initial === matrix[0][2] &&
    matrix[0][2] === matrix[1][1] &&
    matrix[1][1] === matrix[2][0]
  )
    return true;

  return false;
};

// Changing the turn value after each click
const changeTurnValue = function () {
  if (turnValue === 'X') turnValue = 'O';
  else turnValue = 'X';
};

const updateMatrix = function (value, turnValue) {
  let row = Math.floor(value / 10);
  let col = value % 10;
  matrix[row][col] = turnValue;
  console.log(matrix);
};

columns.forEach(function (column) {
  column.addEventListener('click', function (e) {
    const value = e.target.dataset.value;
    if (column.textContent.length === 0) column.textContent = turnValue;
    updateMatrix(value, turnValue);
    if (checkForWin()) winner.textContent = `${turnValue} Wins`;
    if (checkForDraw()) winner.textContent = `Draw`;
    changeTurnValue();
  });
});
