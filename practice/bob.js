/**
 * @param {string} message
 * @returns {string}
 */
export const hey = (message) => {
  message = message.trim();
  if (!message.replaceAll(/[\t\n\s]*/g, '').length) {
    return 'Fine. Be that way!';
  }

  const didYell = message === message.toUpperCase();
  const wasQuestion = message[message.length - 1] === '?';

  if (![...message].some(c => /^[a-zA-Z]$/.test(c))) {
    return wasQuestion ? 'Sure.' : 'Whatever.';
  }

  if (didYell) {
    return wasQuestion ? 'Calm down, I know what I\'m doing!' : 'Whoa, chill out!';
  }

  if (wasQuestion) {
    return 'Sure.';
  }

  return 'Whatever.';
};
