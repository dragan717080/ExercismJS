const LETTERS = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z'],
}

/**
 * @param {Record<number, Array<string>} scores
 * @returns {Record<string, number>}
 */
export const transform = (scores) => Object.fromEntries(Object.entries(scores).flatMap(([k, v]) => v.map(value => [value.toLowerCase(), Number(k)])))
