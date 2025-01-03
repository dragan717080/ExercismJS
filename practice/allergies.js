const getKeyByValue = (d, value) => {
  let entry = Object.entries(d).find(([k, v]) => v === value);
  return entry ? entry[0] : undefined
}

const ALLERGY_SCORES = {
  'eggs': 1,
  'peanuts': 2,
  'shellfish': 4,
  'strawberries': 8,
  'tomatoes': 16,
  'chocolate': 32,
  'pollen': 64,
  'cats': 128
}

/**
 * Gets max exponent of 2 that gives result smaller or equal to value.
 * 
 * @param {number} value
 * @returns {number}
 */
const getMaxDegree = (value) => {
  if (value <= 2) {
    return Math.ceil(Math.log(value));
  }

  let degree = -1;

  while (2**degree <= value) {
    degree += 1
  }

  return degree === value ? degree : degree - 1;
}

export class Allergies {
  /**
   * @param {number} score 
   */
  constructor(score) {
    this.score = score;
    this.getAllergies(score, []);
  }

  /**
   * @param {number} score
   * @param {Array<number>} allergiesList
   * @returns {Array<string>}
   */
  getAllergies(score, allergiesList) {
    if (score < 1) {
      this.allergies = allergiesList.reverse();
      return;
    }

    const v = 2 ** getMaxDegree(score);
    const k = getKeyByValue(ALLERGY_SCORES, v);

    if (typeof(k) !== 'undefined') {
      allergiesList.push(k);
    }

    score -= 2 ** getMaxDegree(score);
    this.getAllergies(score, [...allergiesList]);
  }

  /**
   * @returns {Array<string>}
   */
  list() {
    return this.allergies;
  }

  /**
   * @param {string} allergy
   */
  allergicTo(allergy) {
    return this.allergies.includes(allergy);
  }
}
