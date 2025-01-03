const ORDERS = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth'];

const PRESENTS = [
  'a Partridge in a Pear Tree',
  'two Turtle Doves',
  'three French Hens',
  'four Calling Birds',
  'five Gold Rings',
  'six Geese-a-Laying',
  'seven Swans-a-Swimming',
  'eight Maids-a-Milking',
  'nine Ladies Dancing',
  'ten Lords-a-Leaping',
  'eleven Pipers Piping',
  'twelve Drummers Drumming'
];

/**
 * @param {number} start
 * @param {number} [end]
 */
export const recite = (start, end=start) => {
  [start, end] = [start - 1, end - 1];

  let result = [];

  for (let i = start; i < end + 1; i++) {
    const presentsForVerse = getPresentsForVerse(i, start, end);
    result.push(`On the ${ORDERS[i]} day of Christmas my true love gave to me: ${presentsForVerse}.`);
  }

  return result.join('\n\n') + '\n';
};

const getPresentsForVerse = (verse, start, end) => {
  let presentsForVerse = [];

  for (let i = verse + 1; i--;) {
    const isFirstVerse = verse === 0 || i !== 0;
    let prefix = isFirstVerse ? '' : 'and ';
    presentsForVerse.push(`${prefix}${PRESENTS[i]}`);
  }

  return presentsForVerse.join(', ');
}
