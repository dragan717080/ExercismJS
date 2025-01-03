/**
 * @param {string} s
 * @returns {bool}
 */
export const isPangram = (s) => new Set([...s.toUpperCase()].filter(c => /[A-Z]/.test(c))).size === 26;
