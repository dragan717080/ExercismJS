/**
 * @param {number} n
 * @returns {number}
 */
export const prime = (n) => {
  checkInput(n);

  let [k, q] = [1, 2];

  while (k <= n) {
    if (isPrime(q)) {
      k++;
    }

    q++;
  }

  return q - 1;
};

/**
 * @param {number} n
 * @returns {boolean}
 */
const isPrime = (n) => {
  if (n === 2) {
    return true;
  }

  for (let i = 2; i <= Math.ceil(Math.sqrt(n)); i++) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

/**
 * @param {number} n
 * @returns {void}
 */
const checkInput = (n) => {
  if (n === 0) {
    throw new Error('there is no zeroth prime');
  }
}
