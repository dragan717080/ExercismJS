export const encode = (message) => {
  let s = '';
  let currentCharCount = 1;

  for (let i = 1; i < message.length; i++) {
    const [c, prev] = [message[i], message[i - 1]];

    if (c !== prev) {
      s += `${currentCharCount > 1 ? currentCharCount : ''}${prev}`;
      currentCharCount = 1;
    } else {
      currentCharCount += 1;
    }

    if (i === message.length - 1) {
      s += `${currentCharCount > 1 ? currentCharCount : ''}${c}`;
    }
  }

  return s;
};

export const decode = (message) => {
  let s = '';
  let currentCharCountStr = '';

  for (let i = 0; i < message.length; i++) {
    const c = message[i];

    if (/\D/.test(c)) {
      const charCount = Number(currentCharCountStr) || 1;
      s += c.repeat(charCount);
      currentCharCountStr = '';
    } else {
      currentCharCountStr += c;
    }
  }

  return s;
};
