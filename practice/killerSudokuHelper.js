/**
 * @typedef Cage
 * @property {number} sum
 * @property {number} size
 * @property {number[]} exclude
 */

/**
 * @param {Cage} cage
 * @return {number[]}
 */
export const combinations = (cage) => {
  const { sum, size, exclude } = cage;

  return permutations(
    [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(digit => !exclude.includes(digit)),
    size
  ).filter(permutation => permutation.reduce((sum, digit) => sum + digit, 0) === sum);
}

/**
 * @param {number[]} source 
 * @param {number} length 
 * @param {number[]} prefix 
 * @returns {number[number[]]}
 */
const permutations = (source, length, prefix = []) => {
  return length > 0
    ? source.flatMap((item, index) =>
      permutations(source.slice(index + 1), length - 1, [...prefix, item]))
    : [prefix];
}
