/**
 * Get the first card in the given deck
 *
 * @param {Card[]} deck
 *
 * @returns {Card} the first card in the deck
 */
export const getFirstCard = (deck) => {
  const [card1, ...otherCards] = deck;
  return card1;
}

/**
 * Get the second card in the given deck
 *
 * @param {Card[]} deck
 *
 * @returns {Card} the second card in the deck
 */
export const getSecondCard = (deck) => {
  const [card1, card2, ...otherCards] = deck;
  return card2;
}

/**
 * Switch the position of the first two cards in the given deck
 *
 * @param {Card[]} deck
 *
 * @returns {Card[]} new deck with reordered cards
 */
export const swapTopTwoCards = (deck) => {
  let [card1, card2, ...otherCards] = deck;
  [card1, card2] = [card2, card1];

  return [card1, card2, ...otherCards];
}

/**
 * Put the top card of the given deck into a separate discard pile
 *
 * @param {Card[]} deck
 *
 * @returns {[Card, Card[]]} the top card of the given
 * deck and a new deck containing all the other cards
 */
export const discardTopCard = (deck) => {
  return [deck[0], deck.slice(1)];
}

/** @type {Card[]} **/
const FACE_CARDS = ['jack', 'queen', 'king'];

/**
 * Insert face cards into the given deck
 *
 * @param {Card[]} deck
 *
 * @returns {Card[]} new deck where the second,
 * third, and fourth cards are the face cards
 */
export const insertFaceCards = (deck) => {
  const [card1, ...otherCards] = deck;
  return [card1, 'jack', 'queen', 'king', ...otherCards];
}
