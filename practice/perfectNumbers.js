/** @typedef {'perfect' | 'abundant' | 'deficient'} NumberClassified */

/**
 * @param {number} n
 * @returns {NumberClassified}
 */
export const classify = (n) => {
  checkInput(n);

  const factors = getFactors(n);

  if (factors.length === 1) {
    return 'deficient';
  }

  const factorsSum = factors.reduce((acc, x) => acc + x, 0);

  return factorsSum === n ? 'perfect' : factorsSum < n ? 'deficient' : 'abundant';
};

/**
 * Gets factors of number, excluding number itself.
 * @param {number} n
 * @returns {Array<number>}
 */
const getFactors = (n) => {
  const result = [1];

  for (let i = 2; i < Math.ceil(Math.sqrt(n)); i++) {
    if (n % i === 0) {
      result.push(...[i, n / i]);
    }
  }

  return result;
}

/**
 * @param {number} n
 * @returns {void}
 */
const checkInput = (n) => {
  if (n < 1) {
    throw new Error('Classification is only possible for natural numbers.');
  }
}
