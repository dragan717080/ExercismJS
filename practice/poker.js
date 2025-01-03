/** @typedef {string} Hand */

/**
 * @typedef {object} HandStrength
 * @property {Hand} hand - String representing cards split by whitespace.
 * @property {number} value - The value property.
 * @property {number[]} cards - An array of numbers representing card values.
 */

const HANDS_VALUES = {
  STRAIGHT_FLUSH: 9,
  FOUR_OF_KIND: 8,
  FULL_HOUSE: 7,
  FLUSH: 6,
  STRAIGHT: 5,
  THREE_OF_KIND: 4,
  TWO_PAIR: 3,
  ONE_PAIR: 2,
  HIGH_CARD: 1,
};

/**
 * @param {Record<string, number>} d
 * @returns {Array<Array<string, number>>}
 */
const sortObjectByValues = (d) => {
  const items = Object.keys(d).map((key) => [key, d[key]]);

  items.sort((key1, key2) => key2[1] - key1[1]);

  return items;
}

/**
 * @param {Array<Array<string, number>>} sortedFreqs
 * @returns {Array<number>}
 */
const getSortedFreqsValues = (sortedFreqs) => sortedFreqs.map(freq => Number(freq[0]));

/**
 * @param {string} card
 * @returns {number}
 */
const getNumericValueOfCard = (card) =>
  card === 'A' ? 11 : card === 'J' ? 12 : card === 'Q' ? 13 : card === 'K' ? 14 : Number(card);

/**
 * @param {Record<string, number>} d
 * @param {number} v
 * @returns {number|undefined}
 */
const findKeyByValue = (d, v) => Object.keys(d).find(k => d[k] === v);

/**
 * @param {Array<string>} hands
 * @returns {Array<string>}
 */
export const bestHands = (hands) => {
  const allHands = [];

  hands.forEach(hand => {
    let cards = hand.split(' ');
    const values = cards.map(card => getNumericValueOfCard(card.slice(0, card.length - 1)));
    const signs = cards.map(card => card.charAt(card.length - 1));

    const freqs = values.reduce((acc, card) => {
      acc[card] = acc[card] + 1 || 1;

      return acc;
    }, {});

    const sortedFreqs = sortObjectByValues(freqs);

    const maxValue = sortedFreqs[0][1];
    cards = getSortedFreqsValues(sortedFreqs);

    // Name of hand strength
    let handStrength;

    const isFlush = signs.every(sign => sign === signs[0]);

    switch (maxValue) {
      case 4:
        handStrength = 'FOUR_OF_KIND';
        break;
      case 3:
        handStrength = cards.length === 2 ? 'FULL_HOUSE': 'THREE_OF_KIND';
        break;
      case 2:
        handStrength = cards.length === 3 ? 'TWO_PAIR' : 'ONE_PAIR';
        break;
      case 1:
        // Check for straight
        const maxCard = Math.max(...cards);
        const minCard = Math.min(...cards);

        const isLowestStraight = cards.every(card => [2, 3, 4, 5, 11].includes(card));

        const isStraight = maxCard - minCard === 4 || isLowestStraight;

        if (isLowestStraight) {
          cards = [1, 2, 3, 4, 5];
        }

        handStrength = isStraight ? isFlush ? 'STRAIGHT_FLUSH' : 'STRAIGHT' : 'HIGH_CARD';
        break;
    }

    if (isFlush) {
      const newHandsValue = Math.max(HANDS_VALUES['FLUSH'], HANDS_VALUES[handStrength]);
      handStrength = findKeyByValue(HANDS_VALUES, newHandsValue);
    }

    allHands.push({ hand, value:(HANDS_VALUES[handStrength]), cards });
  });

  /** @type {Hand} */
  let bestHand = [allHands[0].hand];

  // If there is only one hand, return it
  if (allHands.length === 1) {
    return bestHand;
  }

  for (let i = 0; i < allHands.length - 1; i++) {
    // Spread in case it returns two hands
    const betterOfTwoHands = compareHands(allHands[i], allHands[i + 1]);

    bestHand = Array.isArray(betterOfTwoHands) ? betterOfTwoHands : [betterOfTwoHands];
  }

  return bestHand;
};

/**
 * @param {HandStrength} hand1
 * @param {HandStrength} hand2
 * @returns {Hand|Array<Hand>}
 */
const compareHands = (hand1, hand2) => {
  // Compare values first
  if (hand1.value > hand2.value) {
    return hand1.hand;
  } else if (hand1.value < hand2.value) {
    return hand2.hand;
  }

  // In case of two pairs, highest scoring pair wins
  const handStrength = findKeyByValue(HANDS_VALUES, hand1.value);

  if (handStrength === 'TWO_PAIR') {
    hand1.cards = [hand1.cards[1], hand1.cards[0], hand1.cards[2]];
    hand2.cards = [hand2.cards[1], hand2.cards[0], hand2.cards[2]];
  }

  for (let i = 0; i < hand1.cards.length; i++) {
    if (hand1.cards[i] > hand2.cards[i]) {
      return hand1.hand;
    } else if (hand1.cards[i] < hand2.cards[i]) {
      return hand2.hand;
    }
  }

  return [hand1.hand, hand2.hand];
}
