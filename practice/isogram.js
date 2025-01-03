/**
 * @param {string} word
 * @returns {boolean}
 */
export const isIsogram = (word) => {
  word = word.toLowerCase().replace(/[^A-Za-z]/, '');
  return (new Set(word)).size === word.length;
};
