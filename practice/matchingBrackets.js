/**
 * @param {string} s
 * @returns {boolean}
 */
export const isPaired = (s) => {
  let brackets = [];

  for (const c of s) {
    if (['{', '[', '('].includes(c)) {
      brackets.push(c);
    } else if (c === '}') {
      if (brackets.pop() !== '{') {
        return false;
      }
    } else if (c === ']') {
      if (brackets.pop() !== '[') {
        return false;
      }
    } else if (c === ')') {
      if (brackets.pop() !== '(') {
        return false;
      }
    }
  }

  return !brackets.length;
}
