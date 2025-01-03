let ACTIONS = ['wink', 'double blink', 'close your eyes', 'jump', 'reverse'];
ACTIONS = Object.fromEntries(Array.from({ length: [ACTIONS.length] }, (_, i) => [i, ACTIONS[i]]));

/**
 * @param {number} n
 * @returns {Array<string>}
 */
export const commands = (n) => {
  // Rightmost five digits of binary representation
  let bin = n.toString(2).slice(-5);
  const digits = [...bin].reverse();

  let result = [];

  for (let i = 0; i < digits.length; i++) {
    const digit = digits[i];

    if (digit === '0') {
      continue;
    }

    ACTIONS[i] === 'reverse' ? result.reverse() : result.push(ACTIONS[i]);
  }

  return result;
};
