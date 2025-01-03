let NUMBERS = ['no', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
]

/**
 * @param {number} initialBottlesCount
 * @param {number} takeDownCount
 * @returns {Array<string>}
 */
export const recite = (initialBottlesCount, takeDownCount) => {
  let result = [];
  let start = initialBottlesCount;
  let end = initialBottlesCount - takeDownCount;

  for (let i = start; i > end; i--) {
    let verse = [];

    verse.push(...Array(2).fill(`${NUMBERS[i]} green bottle${i !== 1 ? 's' : ''} hanging on the wall,`));
    verse.push('And if one green bottle should accidentally fall,');
    verse.push(`There'll be ${NUMBERS[i - 1].toLowerCase()} green bottle${i !== 2 ? 's' : ''} hanging on the wall.`);

    result.push(...verse);

    if (i !== end + 1) {
      result.push('');
    }
  }

  return result;
};
