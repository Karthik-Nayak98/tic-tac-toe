const [ROW, COL] = [3, 3];

const columns = document.querySelectorAll('.column'),
      winner = document.querySelector('.winner');

let turnValue = 'O',
    matrix = new Array(9).fill(null);




winner.textContent = ' ';

const checkForDraw = function () {
  for (let i = 0; i < 9; ++i)
   if (matrix[i] === null) return false;
  return true;
};

const checkForWin = function () {
  //Checking the columns
  for(let i = 0; i < 3; i++)
    if (matrix[i] != null && matrix[i] === matrix[i+3] && matrix[i+3] === matrix[i+6])
      return true;

  // Checking for Rows
  for (let i = 0; i < 9; i = i+3)
     if (matrix[i] != null && matrix[i] === matrix[i + 1] && matrix[i + 1] === matrix[i + 2])
       return true;

  // Checking for diagonals
  if (matrix[0] != null && matrix[0] === matrix[4] && matrix[4] === matrix[8])
    return true;

  // Checking for opposite diagonal
  if (matrix[2] != null && matrix[2] === matrix[4] && matrix[4] === matrix[6])
     return true;

  return false;
};

// Changing the turn value after each click
const changeTurnValue = function () {
  // if (turnValue === 'X') turnValue = 'O';
  // else turnValue = 'X';
  turnValue = turnValue === 'X' ? 'O' : 'X';
};

const updateMatrix = function (index, turnValue) {
  matrix[index] = turnValue;
  console.log(matrix);
};

columns.forEach(function (column, index) {
  column.addEventListener('click', function (e) {
    if (column.textContent.length === 0) column.textContent = turnValue;
    updateMatrix(index, turnValue);
    if (checkForWin()) winner.textContent = `${turnValue} Wins`;
    if (checkForDraw()) winner.textContent = `Draw`;
    changeTurnValue();
  });
});
