/**
 * @param {string} message
 * @param {number} rails
 * @returns {string}
 */
export const encode = (message, n) => {
  // Create an array of empty strings, one for each rail
  const rails = Array.from({ length: n }, () => '');

  let currentRail = 0;
  let direction = 1;

  for (let char of message) {
    rails[currentRail] += char;

    if (currentRail === 0) {
      direction = 1;
    } else if (currentRail === n - 1) {
      direction = -1;
    }

    currentRail += direction;
  }

  // Join all rails to get the final encrypted string
  return rails.join('');
}

/**
 * @param {string} message
 * @param {number} rails
 * @returns {string}
 */
export const decode = (message, n) => {
  const length = message.length;
  const railMatrix = Array.from({ length: n }, () => Array(length).fill(null));

  let currentRail = 0;
  let direction = 1;

  for (let i = 0; i < length; i++) {
    railMatrix[currentRail][i] = '*';

    if (currentRail === 0) {
      direction = 1;
    } else if (currentRail === n - 1) {
      direction = -1;
    }
    currentRail += direction;
  }

  let index = 0;
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < length; col++) {
      if (railMatrix[row][col] === '*' && index < message.length) {
        railMatrix[row][col] = message[index++];
      }
    }
  }

  let result = '';
  currentRail = 0;
  direction = 1;

  for (let i = 0; i < length; i++) {
    result += railMatrix[currentRail][i];

    if (currentRail === 0) {
      direction = 1;
    } else if (currentRail === n - 1) {
      direction = -1;
    }
    currentRail += direction;
  }

  return result;
};
