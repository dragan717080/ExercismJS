/**
 * Determine how many cards of a certain type there are in the deck
 *
 * @param {number[]} stack
 * @param {number} card
 *
 * @returns {number} number of cards of a single type there are in the deck
 */
export const cardTypeCheck = (stack, card) => stack.filter(x => x === card).length

/**
 * Determine how many cards are odd or even
 *
 * @param {number[]} stack
 * @param {boolean} type the type of value to check for - odd or even
 * @returns {number} number of cards that are either odd or even (depending on `type`)
 */
export const determineOddEvenCards = (stack, type) => stack.filter(x => type ? x % 2 === 0 : x % 2 !== 0).length
