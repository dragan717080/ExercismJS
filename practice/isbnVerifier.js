/**
 * @param {string} s
 * @returns {bool}
 */
export const isValid = (s) => {
  if (!/^\d-?\d{3}-?\d{5}-?[8X]$/.test(s)) {
    return false;
  }

  return [...s.replaceAll('-', '')].reduce((acc, c, i) => acc + (isNaN(Number(c)) ? 10 : Number(c)) * (10 - i), 0) % 11 === 0;
};
