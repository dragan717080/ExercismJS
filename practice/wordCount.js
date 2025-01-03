/**
 * @param {string} s
 * @returns {Record<string, number>}
 */
export const countWords = (s) => {
  let words = s.toLowerCase().split(/[\s\t\n,\"\b]/g).filter(word => word.length).map(word => {
    word = word.replace(/^'|'$/g, '');
    word = word.replace(/[^\w\s']/g, '');
    return word;
  });

  const d = {}

  for (const word of words) {
    d[word] = d[word] + 1 || 1;
  }

  return d;
};
