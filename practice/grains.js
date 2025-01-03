const range = (start, stop, step = 1) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    ((_, index) => start + index * step)
  );

/**
 * @param {number} n
 * @returns {bigint}
 */
export const square = (n) => {
  if (n < 1 || n > 64) {
    throw new Error('square must be between 1 and 64');
  }

  return BigInt(2**(n - 1));
};

/**
 * @returns {bigint}
 */
export const total = () => range(1, 65).reduce((acc, x) => BigInt(acc) + BigInt(square(x)), 0);
