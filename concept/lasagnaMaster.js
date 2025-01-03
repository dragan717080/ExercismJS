/**
 * @param {number} timer
 * @returns {string}
 */
export const cookingStatus = (timer) =>
  timer === 0 ? 'Lasagna is done.' : typeof(timer) !== 'undefined' ? 'Not done, please wait.' : 'You forgot to set the timer.';

/**
 * @param {Array<number>} layers
 * @param {number} timePerLayer
 * @returns {number}
 */
export const preparationTime = (layers, timePerLayer = 2) => layers.length * timePerLayer;

/**
 * @param {Array<string>} ingredients
 * @returns {object}
 */
export const quantities = (ingredients) => ingredients.reduce((acc, x) => {
    x === 'noodles' ? acc.noodles += 50 : x === 'sauce' ? acc.sauce += 0.2 : {};
    return acc;
  }, { noodles: 0, sauce: 0 });

/**
 * @param {Array<string>} friendsList
 * @param {Array<string>} myList
 * @returns {void}
 */
export const addSecretIngredient  = (friendsList, myList) => {
  myList.push(friendsList[friendsList.length - 1]);
}

/**
 * @param {Record<string, number>} recipe
 * @param {number} portions
 * @returns {Record<string, number>}
 */
export const scaleRecipe  = (recipe, portions) => {
  const factor = portions / 2;

  return Object.entries(recipe).reduce((acc, [k, v]) => ({ ...acc, [k]: v * factor }), {});
}
