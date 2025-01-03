const VOWELS = ['a', 'e', 'i', 'o', 'u'];
const CONSONANTS = Array.from(
  { length: 26 },
  ((_, i) => String.fromCharCode(97 + i))).filter(c => !VOWELS.includes(c)
  );

/**
 * @param {string} phrase
 * @returns {string}
 */
export const translate = (phrase) => {
  const words = phrase.split(' ');

  const result = words.map(word => translateWord(word));

  return result.join(' ');
};

/**
 * @param {string} word
 * @returns {string}
 */
const translateWord = (word) => {
  const chars = [...word];

  const firstTwoLetters = chars.slice(0, 2).join('');

  if (VOWELS.includes(chars[0]) || firstTwoLetters === 'xr' || firstTwoLetters === 'yt') {
    return word + 'ay';
  }

  if (/^.*qu.*$/.test(word)) {
    return matchQuWord(word, chars);
  }

  if (CONSONANTS.includes(chars[0])) {
    const yIndex = chars.indexOf('y');

    if (
      yIndex !== 0 &&
      chars.slice(1, yIndex).every(c => CONSONANTS.includes(c))
    ) {
      return chars.slice(yIndex).join('') + chars.slice(0, yIndex).join('') + 'ay';
    }

    const [startingConsonants, firstNonConsonantIndex] = getStartingConsonants(chars);

    return chars.slice(firstNonConsonantIndex).join('') + startingConsonants + 'ay';
  }
}

/**
 * @param {string} word
 * @param {Array<string>} chars
 * @returns {string}
 */
const matchQuWord = (word, chars) => {
  let startingConsonants = '';

  const quIndex = word.indexOf('qu');
  const indexAfterQu = word.indexOf('qu') + 2;

  for (const c of chars.slice(0, quIndex)) {
    if (CONSONANTS.includes(c)) {
      startingConsonants += c;
    }
  }

  const remainingPartOfWord = chars.slice(indexAfterQu).join('');

  return remainingPartOfWord + startingConsonants + 'quay';
}

/**
 * Finds starting consonants and first non consonant index in word.
 * 
 * @param {Array<string>} chars
 * @returns {Array<string|null, number>}
 */
const getStartingConsonants = (chars) => {
  let startingConsonants = chars[0];
  let firstNonConsonantIndex = 1;

  for (const c of chars.slice(1)) {
    if (CONSONANTS.includes(c)) {
      startingConsonants += c;
      firstNonConsonantIndex++;
    } else {
      break;
    }
  }

  return [startingConsonants, firstNonConsonantIndex];
}
