/**
 * @param {Array<number>} a
 * @param {number} value
 * @returns {number|undefined}
 */
export const find = (a, value) => {
  let [low, high] = [0, a.length - 1];

  if (value < a[0] || a[a.length - 1] > a[high]) {
    throw new Error('Value not in array');
  }

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);

    if (a[mid] === value) {
      return mid;
    } else if (mid < value) {
      low = mid + 1
    } else {
      high = mid - 1
    }
  }

  throw new Error('Value not in array');
};
