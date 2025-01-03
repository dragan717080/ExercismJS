/** @typedef {'win' | 'draw' | 'ongoing'} Outcome */

/**
 * @typedef {object} Position
 * @property {number} row
 * @property {number} col
 * @property {string} sign
 */

/**
 * @param {Array<string>} board
 * @returns {Outcome}
 */
export const gamestate = (board) => {
  const a = board.map(row => [...row]);

  const allPositions = a.flatMap((row, i) =>
    row.map((_, j) => [i, j, a[i][j]])
  ).filter(x => x[2] !== ' ');

  const playerOnePositions = allPositions.filter(x => x[2] === 'X');
  const playerTwoPositions = allPositions.filter(x => x[2] === 'O');

  checkInput(playerOnePositions, playerTwoPositions);

  const playerOneWon = checkVictory(playerOnePositions);
  const playerTwoWon = checkVictory(playerTwoPositions);

  if (playerOneWon && playerTwoWon) {
    throw new Error('Impossible board: game should have ended after the game was won');
  } else if (playerOneWon || playerTwoWon) {
    return 'win';
  }

  if (allPositions.length === 9) {
    return 'draw';
  }

  return 'ongoing';
}

/**
 * @param {Array<Position>} playerOnePositions
 * @param {Array<Position>} playerTwoPositions
 * @returns {bool}
 */
const wasRowVictory = (playerPositions) => {
  const hasFilledRow = (playerPositions, rowIndex) => playerPositions.filter(x => x[0] === rowIndex).length === 3;

  for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
    if (
      hasFilledRow(playerPositions, rowIndex) ||
      hasFilledRow(playerPositions, rowIndex)
    ) {
      return true;
    }
  }

  return false;
}

const wasMainDiagonalVictory = (playerPositions) => {
  const hasFilledMainDiagonal = (playerPositions) => playerPositions.filter(x => x[0] === x[1]).length === 3;

  return hasFilledMainDiagonal(playerPositions);
}

const wasSideDiagonalVictory = (playerPositions) => {
  const hasFilledSideDiagonal = (playerPositions) => {
    const positionsStr = playerPositions.map(position => String(position.slice(0, 2)));
    return [[0, 2], [1, 1], [2, 0]].every(x => positionsStr.includes(String(x)));
  };

  return hasFilledSideDiagonal(playerPositions);
}

/**
 * @param {Array<Position>} playerOnePositions
 * @param {Array<Position>} playerTwoPositions
 * @returns {bool}
 */
const wasColVictory = (playerPositions) => {
  const hasFilledCol = (playerPositions, colIndex) => playerPositions.filter(x => x[1] === colIndex).length === 3;

  for (let colIndex = 0; colIndex < 3; colIndex++) {
    if (
      hasFilledCol(playerPositions, colIndex)
    ) {
      return true;
    }
  }

  return false;
}

/** Checks if the game is over (victory) based on player positions. */
const checkVictory = (playerPositions) =>
  wasRowVictory(playerPositions) ||
  wasColVictory(playerPositions) ||
  wasMainDiagonalVictory(playerPositions) ||
  wasSideDiagonalVictory(playerPositions);

/**
 * @param {Array<Position>} playerOnePositions
 * @param {Array<Position>} playerTwoPositions
 * @param {boolean} allMovesWerePlayed
 * @returns {void}
 */
const checkInput = (playerOnePositions, playerTwoPositions, allMovesWerePlayed) => {
  if (playerTwoPositions.length > playerOnePositions.length) {
    throw new Error('Wrong turn order: O started');
  } else if (playerOnePositions.length - playerTwoPositions.length > 1) {
    throw new Error('Wrong turn order: X went twice');
  }
}
