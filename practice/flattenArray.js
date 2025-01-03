/**
 * @param {Array<number>} l
 * @returns {Array<number>}
 */
export const flatten = (l, result=[]) => {
  l.forEach(x => {
    if (Array.isArray(x)) {
      flatten(x, result);
    } else if (x !== null) {
      result.push(x);
    }
  })

  return result;
};
