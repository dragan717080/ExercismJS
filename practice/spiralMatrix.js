/**
 * @param {number} n
 * @returns {Array<Array<number>>}
 */
export const spiralMatrix = (n) => {
  let result = Array(n).fill().map(x => []);
  let elementsCount = 0;

  const DIRECTIONS = ['RIGHT', 'BOTTOM', 'LEFT', 'TOP'];

  const countsPerDirection = Array.from({ length: n }).flatMap((_, index) => index === 0 ? n - index : [n - index, n - index]);

  for (const [index, _] of Object.entries(countsPerDirection)) {
    const [currentRow, direction] = [Math.floor(index / DIRECTIONS.length), DIRECTIONS[index % DIRECTIONS.length]];

    switch (direction) {
      case 'RIGHT':
        for (let j = currentRow; j < n - currentRow; j++) {
          result[currentRow][j] = ++elementsCount;
        }
        break;
      case 'BOTTOM':
        for (let i = currentRow + 1; i < n - currentRow; i++) {
          result[i][n - currentRow - 1] = ++elementsCount;
        }
        break;
      case 'LEFT':
        for (let j = n - currentRow - 2; j >= currentRow; j--) {
          result[n - currentRow - 1][j] = ++elementsCount;
        }
        break;
      case 'TOP':
        for (let i = n - currentRow - 2; i >= currentRow + 1; i--) {
          result[i][currentRow] = ++elementsCount;
        }
    }
  }

  return result;
}
