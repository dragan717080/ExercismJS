/**
 * @param {string} s
 * @param {number} n
 * @returns {number}
 */
export const largestProduct = (s, n) => {
  if (n <= 0) {
    throw new Error('Span must be greater than zero');
  }

  if (n > s.length) {
    throw new Error('Span must be smaller than string length');
  }

  let products = [];

  for (let i = 0; i < s.length - n + 1; i++) {

    products.push([...s].slice(i, i + n).reduce((acc, x) => {
      const n = Number(x);
      if (isNaN(n)) {
        throw new Error('Digits input must only contain digits');
      }

      return acc * n;
    }, 1));
  }

  return Math.max(...products);
};
