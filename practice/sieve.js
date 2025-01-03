const range = (start, stop, step = 1) =>
  Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)

/**
 * @param {number} n
 * @returns {Array<number>}
 */
export const primes = (n) => {
  if (n === 1) {
    return [];
  } else if (n === 2) {
    return [2];
  }

  let primes = range(2, n + 1);
  let nonPrimes = [];

  for (const prime of primes) {
   for (const m of range(prime * 2, n + 1, prime)) {
      nonPrimes.push(m);
    }
  }

  return primes.filter(x => !nonPrimes.includes(x));
};
