const SINGLE_DIGITS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const TEN_TO_TWENTY = {
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen'
}

const TWO_DIGITS = {
  10: 'ten',
  20: 'twenty',
  30: 'thirty',
  40: 'forty',
  50: 'fifty',
  60: 'sixty',
  70: 'seventy',
  80: 'eighty',
  90: 'ninety'
}

const LIMITS = {
  100: 'hundred',
  1_000: 'thousand',
  1_000_000: 'million',
  1_000_000_000: 'billion'
}

/**
 * @param {number} n
 * @param {Array<string>} [result]
 * 
 * @returns {string}
 */
export const say = (n, result=[]) => {
  const s = String(n);

  if (n < 0 || n > 999_999_999_999) {
    throw new Error('Number must be between 0 and 999,999,999,999.');
  }

  if (n < 1000) {
    return [...result, processDigitGroup(n)].join(' ');
  }

  const partStr = n >= 1_000_000_000 ? ' billion' : n >= 1_000_000 ? ' million' : n >= 1_000 ? ' thousand' : '';

  // e.g. is 1_000_000
  if (s in LIMITS) {
    return [...result, 'one' + partStr].join(' ');
  }

  const firstIndex = s.length % 3 || 3;
  result.push(processDigitGroup(Number(s.slice(0, firstIndex))) + partStr);

  n = Number(s.slice(firstIndex))

  return say(n, result);
}

/** Processes group of digits of size three or less. */
const processDigitGroup = (n) => {
  let group = Number([...String(n)].slice(0, 3).join(''));

  // String representations of digit
  let result = '';

  if (group === 0) {
    return 'zero';
  } else if (group === 100) {
    return 'one hundred';
  }

  while (group > 0) {
    if (group > 100) {
      let hundredsStr = `${SINGLE_DIGITS[Math.floor(group / 100)]} hundred${group % 100 !== 0 ? ' ' : ''}`;

      result += hundredsStr;
      group = group % 100;
    } else if (group > 9) {
      if (group in TEN_TO_TWENTY) {
        result += TEN_TO_TWENTY[group];
        break;
      } else {
        let twoDigitsStr = TWO_DIGITS[group % 100 - group % 10];

        if (group % 10 !== 0) {
          twoDigitsStr += '-';
        }

        result += twoDigitsStr;
        group = group % 10;
      }
    } else {
      result += SINGLE_DIGITS[group];
      group = -1;
    }
  }

  return result;
}
