/**
 * @param {number} totalRows
 * @param {number} i
 * @returns {string}
 */
const getRow = (totalRows, i) => {
  const letter = String.fromCharCode(65 + i);
  const sideSpaces = ' '.repeat(totalRows - i);
  const innerSpaces = ' '.repeat(Math.max(0, 2 * i - 1));
  const secondLetterCount = i === 0 ? 0 : 1;

  return sideSpaces + letter + innerSpaces + letter.repeat(secondLetterCount) + sideSpaces;
}

/**
 * @param {string} c
 * @returns {Array<string>}
 */
export const rows = (c) => {
  const totalRows = Math.ceil(c.charCodeAt(0)- 65);
  const result = [];

  for (let i = 0; i < totalRows + 1; i++) {
    result.push(getRow(totalRows, i));
  }

  for (let i = totalRows; i--;) {
    result.push(getRow(totalRows, i));
  }

  return result;
};
