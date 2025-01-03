const OPERATIONS = ['multiplied by', 'divided by', 'plus', 'minus'];

/**
 * @param {string} s
 * @returns {number}
 */
export const answer = (s) => {
  if (!s.startsWith('What is')) {
    throw new Error('Unknown operation');
  }

  const words = s.slice(0, s.length - 1).split(' ');
  const operators = s.split(/\d/).map(operand => operand.replace(/[^A-Za-z\s]+/g, '').trim()).slice(1).filter(Boolean);
  const operands = words.filter(word => /^-?\d+$/.test(word)).map(s => Number(s));

  checkOrder(words, operators, operands);

  if (!operators.length) {
    return operands[0];
  }

  const [a, b] = [operands[0], operands[1]];

  let result = handleOperation(a, b, operators[0]);

  if (operators.length === 2) {
    result = handleOperation(result, operands[2], operators[1]);
  }

  return result;
};

const handleOperation = (a, b, operator) => {
  let result;

  switch(operator) {
    case 'multiplied by': result = a * b; break;
    case 'divided by': result = a / b; break;
    case 'plus': result = a + b; break;
    case 'minus': result = a - b; break;
    default:
      throw new Error('Unknown operation');
  }

  return result;
}

const checkOrder = (words, operators, operands) => {
  if (!operators.length && !operands.length || !words.length || words.length === 1 && /\D/.test(words[0])) {
    throw new Error('Syntax error');
  }

  if (!(/^-?\d+$/.test(words.slice(-1)[0])) && !OPERATIONS.includes(words.slice(-1)[0])) {
    throw new Error('Unknown operation');
  }

  // Two operations in row
  if (operators.length === 1) {
    const parts = operators[0].split(' ');

    if (parts.length === 2 && parts.every(x => OPERATIONS.includes(x))) {
      throw new Error('Syntax error');
    }
  }

  if (!(/^-?\d+$/.test(words.slice(-1)[0]))) {
    throw new Error('Syntax error');
  }

  for (let i = 0; i < words.length; i++) {
    if (/-?\d/.test(words[i]) && /-?\d/.test(words[i - 1])) {
      throw new Error('Syntax error');
    }
  }
}
