/**
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
export const score = (x, y) => {
  const distance = Math.sqrt(x**2 + y**2);

  return distance <= 1 ? 10 : distance <= 5 ? 5 : distance <= 10 ? 1 : 0;
};
