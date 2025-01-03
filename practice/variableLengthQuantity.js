/**
 * @param {Array<number>} hexNumbers - Array of hex representations.
 * @returns {number}
 */
export const encode = (hexNumbers) => {
  const result = [];

  hexNumbers.forEach(hexNum => {
    let bin = hexNum.toString(2);

    // After reversing the binary number, pad with zeros on the left
    const padCount = (7 - bin.length % 7) % 7;

    bin = bin.padStart(bin.length + padCount, '0');

    let chunks = splitArrayToChunks([...bin], 7);

    chunks = setSignificantBytes(chunks);

    chunks.forEach(chunk => {
      const decimalValue = parseInt(chunk, 2);
      result.push(decimalValue);
    });
  });

  return result;
};

/**
 * @param {Array<string>} chunks
 * @returns {Array<string>}
 */
const setSignificantBytes = (chunks) =>
  chunks = chunks.map((chunk, index) => index === chunks.length - 1 ? '0' + chunk : '1' + chunk);

/**
 * @param {Array<number>} hexNumbers
 * @returns {number}
 */
export const decode = (hexNumbers) => {
  // There can be multiple integers, so make 2D array
  /** @type {Array<Array<number>} */
  let resultGroups = [];

  /** @type {Array<number>} */
  let result = [];

  /** @type {Array<string>} */
  hexNumbers.forEach((hexValue) => {
    let bin = hexValue.toString(2).padStart(8, '0');
    const isLast = bin[0] === '0';

    if (hexNumbers.length === 1 && bin.length === 8 && bin[0] === '1') {
      throw new Error('Incomplete sequence');
    }

    result.push(bin.slice(1));

    if (isLast) {
      bin = result.join('');
      resultGroups.push(parseInt(bin, 2));
      result = [];
    };
  });

  return resultGroups;
};

/**
 * @param {Array<any>} arr
 * @param {number} size
 * @param {Array<any>}
 */
const splitArrayToChunks = (arr, size) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    // Since it is a string, use `join`
    arr.slice(i * size, i * size + size).join('')
  );
}

const decimalToHex = (d) => {
  const HEX_DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  let result = '0x';
  let logarithmOfHexBase = 0;
  let n = d;

  if (d === 0) {
    return 0;
  }

  if (d < 16) {
    return result + String(HEX_DIGITS[d]);
  }

  while (16**logarithmOfHexBase < d) {
    logarithmOfHexBase++;
  }

  for (let e = logarithmOfHexBase; e--;) {
    const degreeValue = Math.floor(n / 16**e);
    n -= degreeValue * 16**e;

    result += HEX_DIGITS[degreeValue];
  }

  return result;
}
