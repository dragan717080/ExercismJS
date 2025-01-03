export const COLORS = [
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
  'grey',
  'white'
];

/**
 * @param {string} colorBand
 * @returns {number}
 */
export const colorCode = (colorBand) => COLORS.indexOf(colorBand);
