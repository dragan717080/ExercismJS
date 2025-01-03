/**
 * @param {number} rowCount
 * @param {Array<number>} previousRow
 * @returns {Array<number>}
 */
export const rows = (rowCount) => {
  if (rowCount <= 0) {
    return [];
  }

  let a = [[1]];

  for (let i = 1; i < rowCount; i++) {
    let row = [];

    for (let j = 0; j <= i; j++) {
      row.push(j === 0 || j === i ? 1 : a[i - 1][j - 1] + a[i - 1][j]);
    }

    a.push(row);
  }

  return a;
};
