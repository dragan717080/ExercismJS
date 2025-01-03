export class Change {
  /**
   * @param {Array<number>} coinArray
   * @param {Array<number>} target
   * @returns {Array<number>}
   */
  calculate(coinArray, target) {
    if (target < 0) {
      throw new Error('Negative totals are not allowed.');
    }

    // Create an array to store the minimum number of coins needed for each amount
    const minCoins = Array(target + 1).fill(Infinity);

    const coinCombinations = Array(target + 1).fill(null);

    // Base case: 0 coins are needed to make the target of 0
    minCoins[0] = 0;

    // Loop through each amount from 1 to the target
    for (let amount = 1; amount <= target; amount++) {
      for (const coin of coinArray) {
        if (coin <= amount) {
          const remainder = amount - coin;

          if (minCoins[remainder] + 1 < minCoins[amount]) {
            minCoins[amount] = minCoins[remainder] + 1;
            coinCombinations[amount] = coin;
          }
        }
      }
    }

    // If there is no combination of coins to make the target, throw an error
    if (minCoins[target] === Infinity) {
      throw new Error(`The total ${target} cannot be represented in the given currency.`);
    }

    // Construct the result array by backtracking the `coinCombinations`
    const result = [];
    let amount = target;

    while (amount > 0) {
      const coin = coinCombinations[amount];
      result.push(coin);
      amount -= coin;
    }

    return result;
  }
}
