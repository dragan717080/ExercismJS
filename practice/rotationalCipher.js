/**
 * @param {string} message
 * @param {number} key
 * @returns {string}
 */
export const rotate = (message, key) => [...message].map(
  (c, i) => {
    if (/[A-Za-z]/.test(c)) {
      const baseLetterCode = c === c.toLowerCase() ? 97 : 65;
      return String.fromCharCode(baseLetterCode + (message.charCodeAt(i) -baseLetterCode + key) % 26)
    } else {
      return c;
    }
  }
).join('');
