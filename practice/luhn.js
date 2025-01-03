/**
 * @param {string} s
 * @returns {bool}
 */
export const valid = (s) => {
  s = s.replaceAll(' ', '');

  if (s.length < 2) {
    return false;
  }

  let sum = 0;

  for (const [i, c] of Object.entries([...s].reverse().join(''))) {
    if (!/\d/.test(c)) {
      return false;
    }

    const d = parseInt(c);

    sum += i % 2 !== 0 ? d * 2 > 9 ? d * 2 - 9 : d * 2 : d;
  }

  return sum % 10 === 0;
};
