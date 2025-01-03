const range = (start, stop, step = 1) => {
  return Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)
}

/**
 * @param {Array<number>} a
 * @param {number} n
 * @returns {number}
 */
export const sum = (a, n) => Array.from(new Set(a.flatMap(m => m !== 0 ? range(m, n, m) : 0))).reduce((acc, x) => acc + x, 0);
