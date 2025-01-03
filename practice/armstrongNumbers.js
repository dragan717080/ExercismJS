/**
 * @param {number} n
 * @returns {boolean}
 */
export const isArmstrongNumber = (n) => [...String(n)].reduce((acc, c) => acc + Number(c)**String(n).length, 0) === n;
