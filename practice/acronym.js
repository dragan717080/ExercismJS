/**
 * @param {string} s
 * @returns {string}
 */
export const parse = (s) => {
  const words = s.split(/[-\s]+/g);
  let result = ''

  for (let word of Object.values(words)) {
    word = word.replace(/[^A-Za-z]/g, '');
    [...word].forEach((c, i) => {
      if (i === 0) {
        result += c.toUpperCase();
      }
    })
  }

  return result;
};
