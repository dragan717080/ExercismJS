/**
 * Calculates the sum of the two input arrays.
 *
 * @param {number[]} array1
 * @param {number[]} array2
 * @returns {number} sum of the two arrays
 */
export const twoSum = (array1, array2) => parseInt(array1.join('')) + parseInt(array2.join(''));

/**
 * Checks whether a number is a palindrome.
 *
 * @param {number} value
 * @returns {boolean} whether the number is a palindrome or not
 */
export const luckyNumber = (value) => value.toString() === value.toString().split('').reverse().join('');

/**
 * Determines the error message that should be shown to the user
 * for the given input value.
 *
 * @param {string|null|undefined} input
 * @returns {string} error message
 */
export const errorMessage = (input) => {
  return !input ? 'Required field' : !Number(input) ? 'Must be a number besides 0' : '';
}
