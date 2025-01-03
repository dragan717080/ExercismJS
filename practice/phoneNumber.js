/**
 * @param {string} digits
 * @returns {void}
 */
const checkDigits = (digits) => {
  if (digits.length < 10) {
    throw new Error('Incorrect number of digits');
  }

  if (digits.length > 11) {
    throw new Error('More than 11 digits');
  }

  if (digits.length === 11 && digits[0] !== '1') {
    throw new Error('11 digits must start with 1');
  }
}

/**
 * @param {string} code
 * @param {boolean} [isArea] - Defaults to true.
 */
const checkCode = (code, isArea=true) => {
  const name = isArea ? 'Area' : 'Exchange';

  if (code === '0') {
    throw new Error(name + ' code cannot start with zero');
  }

  if (code === '1') {
    throw new Error(name + ' code cannot start with one');
  }
}

/**
 * @param {string} s
 * @param {void}
 */
const checkLetters = (s) => {
  if (/[@:!]/.test(s)) {
    throw new Error('Punctuations not permitted');
  }

  if (/[A-Za-z]/.test(s)) {
    throw new Error('Letters not permitted');
  }
}

/**
 * @param {string} s
 * @returns {string}
 */
export const clean = (s) => {
  checkLetters(s);

  const digits = s.replace(/\D/g, '');
  checkDigits(digits);

  let num = s.replace(/[\(\)\-\+\s\t\.]/g, '');

  if (num.length === 11) {
    num = num.slice(1);
  }

  const [areaCode, exchangeCode] = [num[0], num[3]];

  checkCode(areaCode);
  checkCode(exchangeCode, false);

  return num;
};
