const transpose = (a) => a[0].map((_, colIndex) => a.map(row => row[colIndex]));

/**
 * @param {Array<Array<number>>} a
 * @returns {Array<Record<string, number>>}
 */
export const saddlePoints = (a) => {
  const transposed = transpose(a);
  const rowMaxes = a.map(row => Math.max(...row));
  const colMins = transposed.map(col => Math.min(...col));

  let result = [];

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[0].length; j++) {
      if (a[i][j] === rowMaxes[i] && a[i][j] === colMins[j]) {
        result.push({ row: i + 1, column: j + 1});
      }
    }
  }

  return result;
};
