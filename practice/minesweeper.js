/**
 * @param {Array<string>} input
 * @returns {Array<string>}
 */
export const annotate = (input) => {
  let a = [...input.map(row => [...row])];

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[0].length; j++) {
      if (a[i][j] !== '*') {
        let neighbors = [];

        if (i !== 0) {
          neighbors.push(a[i-1][j-1] || null);
          neighbors.push(a[i-1][j] || null);
          neighbors.push(a[i-1][j+1] || null);
        }

        neighbors.push(a[i][j-1] || null);
        neighbors.push(a[i][j+1] || null);

        if (i !== a.length - 1) {
          neighbors.push(a[i+1][j-1] || null);
          neighbors.push(a[i+1][j] || null);
          neighbors.push(a[i+1][j+1] || null);
        }

        a[i][j] = neighbors.filter(x => x === '*').length || ' ';
      }
    }
  }

  return a.map(row => row.join(''));
};
