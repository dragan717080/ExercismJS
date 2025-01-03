const getKeyByValue = (d, value) => {
  let entry = Object.entries(d).find(([k, v]) => v === value);
  return entry ? entry[0] : undefined
}

const getCounter = (a) => a.reduce((acc, x) => {
  acc[x] = acc[x] + 1 || 1;
  return acc;
}, {});

const yacht = (dices) => new Set(dices).size === 1 ? 50 : 0;

const straight = (dices, isBig=true) => {
  const a = Array.from({ length: 5 }).map((_, i) => isBig ? i + 2 : i + 1);
  dices.sort();

  return dices.every((d, i) => d === a[i]) ? 30 : 0;
}

const count = (a, v) =>  v * a.filter(x => x === v).length

const fullHouse = (dices) => {
  let d = getCounter(dices);

  if (!Object.values(d).includes(3)) {
    return 0;
  }

  return 3 * Number(getKeyByValue(d, 3)) + (2 * Number(getKeyByValue(d, 2)) || 0);
}

const fourOfKind = (dices) => {
  const d = getCounter(dices);
  return 4 * (Number(getKeyByValue(d, 5)) || Number(getKeyByValue(d, 4)) || 0);
}

const choice = (dices) => dices.reduce((acc, x) => acc + x, 0);

/**
 * @param {Array<number>} dices
 * @param {string} category
 * @returns {number}
 */
export const score = (dices, category) => {
  switch (category) {
    case 'yacht': return yacht(dices);
    case 'little straight': return straight(dices, false);
    case 'big straight': return straight(dices);
    case 'ones': return count(dices, 1);
    case 'twos': return count(dices, 2);
    case 'threes': return count(dices, 3);
    case 'fours': return count(dices, 4);
    case 'fives': return count(dices, 5);
    case 'sixes': return count(dices, 6);
    case 'full house': return fullHouse(dices);
    case 'four of a kind': return fourOfKind(dices);
    case 'choice': return choice(dices);
  }
};
