const JUICES = {
  'Pure Strawberry Joy': 0.5,
  'Energizer': 1.5,
  'Green Garden': 1.5,
  'Tropical Island': 3,
  'All or Nothing': 5
}

/**
 * Determines how long it takes to prepare a certain juice.
 *
 * @param {string} name
 * @returns {number} time in minutes
 */
export const timeToMixJuice = (name) => Object.keys(JUICES).includes(name) ? JUICES[name] : 2.5;

/**
 * Calculates the number of limes that need to be cut
 * to reach a certain supply.
 *
 * @param {number} wedgesNeeded
 * @param {string[]} limes
 * @returns {number} number of limes cut
 */
export const limesToCut = (wedgesNeeded, limes) => {
  const wedges = { 'small': 6, 'medium': 8, 'large': 10 };
  let wedgeCount = 0;
  let n = 0;

  if (wedgesNeeded === 0) {
    return 0;
  }

  for (let i = 0; i < limes.length; i++) {
    wedgeCount += wedges[limes[i]];

    n += 1;

    if (wedgeCount >= wedgesNeeded) {
      break;
    }
  }

  return n;
}

/**
 * Determines which juices still need to be prepared after the end of the shift.
 *
 * @param {number} timeLeft
 * @param {string[]} orders
 * @returns {string[]} remaining orders after the time is up
 */
export function remainingOrders(timeLeft, orders) {
  let endIndex = 0;

  for (const [index, order] of Object.entries(orders)) {
    timeLeft -= timeToMixJuice(order);

    if (timeLeft <= 0) {
      endIndex = parseInt(index) + 1;
      break;
    }
  }

  return endIndex !== 0 ? orders.slice(endIndex) : [];
}
