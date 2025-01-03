const getCounter = (a) => a.reduce((acc, x) => {
  acc[x] = acc[x] + 1 || 1;
  return acc;
}, {});

/**
 * Compares deep equality.
 * 
 * @param {object} x
 * @param {object} y
 * @returns {bool}
 */
function areObjectsEqual(x, y) {
  const ok = Object.keys, tx = typeof x, ty = typeof y;

  return x && y && tx === 'object' && tx === ty ? (
    ok(x).length === ok(y).length &&
      ok(x).every(key => areObjectsEqual(x[key], y[key]))
  ) : (x === y);
}

/**
 * @param {string} word
 * @param {Array<string>} candidates
 * @returns {Array<string>}
 */
export const findAnagrams = (word, candidates) => {
  const wordFreq = getCounter([...word.toUpperCase()]);

  let result = [];

  for (const candidate of candidates) {
    const candidateFreq = getCounter([...candidate.toUpperCase()]);

    if (word.toUpperCase() !== candidate.toUpperCase() && areObjectsEqual(wordFreq, candidateFreq)) {
      result.push(candidate);
    }
  }

  return result;
};
