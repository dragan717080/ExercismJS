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
 * @param {Array<string>} colorBands
 * @returns {string}
 */
export const decodedValue = (colorBands) => parseInt(colorBands.slice(0, 2).reduce((acc, c) => acc + COLORS.indexOf(c), ''));
