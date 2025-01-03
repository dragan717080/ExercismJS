/**
 * @param {string} message
 * @param {Record<string, number>} key
 * @returns {string}
 */
export const encode = (message, key) => {
  const {a, b} = key;
  gcd(a, 26);

  let result = '';

  [...message.toLowerCase()].forEach((c, index) => {
    if (/[A-Za-z]/.test(c)) {
      const i = c.charCodeAt(0) - 97;
      const letter = String.fromCharCode(97 + (a * i + b) % 26);
      result += letter;
    } else if (/\d/.test(c)) {
      result += c;
    }
  });

  return splitArrayToChunks([...result], 5);
};

/**
 * @param {string} message
 * @param {Record<string, number>} key
 * @returns {string}
 */
export const decode = (message, key) => {
  const {a, b} = key;
  const mmi = modularInverse(a, 26);
  let result = '';

  [...message].forEach((c, index) => {
    if (/[A-Za-z]/.test(c)) {
      const i = c.charCodeAt(0) - 97;
      const product = mmi * (i - b);
      const letter = String.fromCharCode(97 + remEuclid(product, 26) % 26);

      result += letter;
    } else if (/\d/.test(c)) {
      result += c;
    }
  });

  return result;
};

const modularInverse = (a, b) => {
  gcd(a, b);

  let k = b + 1;

  while (k % a !== 0) {
    k += b;
  }

  return Math.floor(k / a);
}

const gcd = (a, b) => {
  while (b) {
    [a, b] = [b, a % b];
  }

  if (a !== 1) {
    throw new Error('a and m must be coprime.');
  }

  return a;
}

const splitArrayToChunks = (arr, size) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size).join('')
  ).join(' ');
}

const remEuclid = (a, n) => a % n + (Math.sign(a) !== Math.sign(n) ? n : 0);
