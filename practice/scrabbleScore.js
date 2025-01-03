const LETTER_SCORES = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
}

const getKeyByValue = (d, value) => {
  const key = Object.entries(d).find(([_, values]) => values.includes(value) ? values[0] : null);
  return key && key[0];
}

/**
 * @param {string} word
 * @returns {number}
 */
export const score = (word) => [...word.toUpperCase()].reduce((acc, c) => acc + Number(getKeyByValue(LETTER_SCORES, c)), 0);
