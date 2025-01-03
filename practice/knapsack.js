/**
 * @typedef {object} Item
 * @property {number} weight
 * @property {number} value
 */

/**
 * @param {number} maxWeight
 * @param {Array<Item>} items
 */
export const knapsack = (maxWeight, items) => {
  // Create a 2D array to store maximum values
  const a = Array(items.length + 1).fill(0).map(() => Array(maxWeight + 1).fill(0));

  for (let i = 1; i <= items.length; i++) {
    for (let w = 0; w <= maxWeight; w++) {
      const currentItem = items[i - 1];
      if (currentItem.weight <= w) {
        a[i][w] = Math.max(
          a[i - 1][w],
          a[i - 1][w - currentItem.weight] + currentItem.value
        );
      } else {
        a[i][w] = a[i - 1][w];
      }
    }
  }

  const maxValue = a[items.length][maxWeight];

  return maxValue;
};
