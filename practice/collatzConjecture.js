/**
 * @param {number} startNumber
 * @returns {number}
 */
export const steps = (startNumber) => {
  if (startNumber < 1) {
    throw new Error('Only positive numbers are allowed');
  }

  let n = 0;
  let currentNumber = startNumber;

  while (currentNumber > 1) {
    currentNumber = currentNumber % 2 === 0 ? currentNumber / 2 : 3 * currentNumber + 1;
    n += 1;
  }

  return n;
};
