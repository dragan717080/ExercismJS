const PLANETS = {
  'Mercury': 0.2408467,
  'Venus': 0.61519726,
  'Earth': 1.0,
  'Mars': 1.8808158,
  'Jupiter': 11.862615,
  'Saturn': 29.447498,
  'Uranus': 84.016846,
  'Neptune': 164.79132
}

const capitalize = (s) => s[0].toUpperCase() + s.slice(1);

/**
 * @param {string} planet
 * @param {number} n
 * @returns {number}
 */
export const age = (planet, n) => parseFloat((n / PLANETS[capitalize(planet)] / 31_557_600).toFixed(2));
