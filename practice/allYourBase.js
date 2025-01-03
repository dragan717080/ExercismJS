/**
 * @param {Array<number>} oldBaseValue
 * @param {number} oldBase
 * @param {number} newBase
 * @returns {Array<number>}
 */
export const convert = (oldBaseValue, oldBase, newBase) => {
  checkInput(oldBaseValue, oldBase, newBase);
  oldBaseValue.reverse();

  const decimalValue = oldBaseValue.reduce((acc, digit, index) => acc + digit*oldBase**index, 0);

  const result = [];
  let n = decimalValue;

  // Resulting array length will be log new base + 1
  const logNewBase = findLogarithmForGivenBase(decimalValue, newBase);

  for (let e = logNewBase + 1; e--;) {
    const degreeValue = newBase**e;

    if (degreeValue > n) {
      result.push(0);
      continue;
    }

    const digit = Math.floor(n / degreeValue)

    n -= digit * newBase**e;
    result.push(digit);
  }

  return result;
};

const checkInput = (oldBaseValue, oldBase, newBase) => {
  const isEmptyInput = oldBaseValue.length === 0;
  const areMultipleZeros = oldBaseValue.length > 1 && oldBaseValue.every(x => x === 0);
  const hasLeadingZeros = oldBaseValue.length > 1 && oldBaseValue[0] === 0;
  const hasInvalidDigits = oldBaseValue.length > 1 && oldBaseValue.some(x => x < 0 || x >= oldBase);

  if (oldBase < 2) {
    throw new Error('Wrong input base');
  } else if (newBase < 2) {
    throw new Error('Wrong output base');
  }

  if (isEmptyInput || areMultipleZeros || hasLeadingZeros || hasInvalidDigits) {
    throw new Error('Input has wrong format');
  }
}

/**
 * @param {number} d
 * @param {number} base
 * @returns {number}
 */
const findLogarithmForGivenBase = (d, base) => {
  let k = 1;

  while (base**k <= d) {
    k += 1;
  }

  k -= 1;

  return k;
}
