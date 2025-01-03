/**
 * Respond with the correct character, given the line of the
 * poem, if this were said at the front door.
 *
 * @param {string} line
 * @returns {string}
 */
export const frontDoorResponse = (line) => line[0];

/**
 * Format the password for the front-door, given the response
 * letters.
 *
 * @param {string} word the letters you responded with before
 * @returns {string} the front door password
 */
export const frontDoorPassword = (word) => word[0].toUpperCase() + word.slice(1).toLowerCase();

/**
 * Respond with the correct character, given the line of the
 * poem, if this were said at the back door.
 *
 * @param {string} line
 * @returns {string}
 */
export const backDoorResponse = (line) => {
  line = line.replaceAll(/[\t\n ]+/g, '');
  return line[line.length - 1];
}

/**
 * Format the password for the back door, given the response
 * letters.
 *
 * @param {string} word the letters you responded with before
 * @returns {string} the back door password
 */
export const backDoorPassword = (word) => frontDoorPassword(word) + ', please';
