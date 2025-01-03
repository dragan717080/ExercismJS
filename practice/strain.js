/**
 * @param {Array<number>} l
 * @param {Function} f
 * @returns {Array<number>}
 */
export const keep = (l, f) => l.filter(f);

/**
 * @param {Array<number>} l
 * @param {Function} f
 * @returns {Array<number>}
 */
export const discard = (l, f) => l.filter(x => !f(x));
