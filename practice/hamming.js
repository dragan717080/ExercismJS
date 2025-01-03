/**
 * @param {string} s1
 * @param {string} s2
 */
export const compute = (s1, s2) => {
  if (s1.length !== s2.length) {
    throw new Error('strands must be of equal length');
  }

  return [...s1].reduce((acc, c, i) => acc + Number(c !== s2[i]), 0);
}
