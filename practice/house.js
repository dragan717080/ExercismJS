const ANIMALS = [
  'house that Jack built',
  'malt',
  'rat',
  'cat',
  'dog',
  'cow with the crumpled horn',
  'maiden all forlorn',
  'man all tattered and torn',
  'priest all shaven and shorn',
  'rooster that crowed in the morn',
  'farmer sowing his corn',
  'horse and the hound and the horn',
];

const ACTIONS = [
  'lay in',
  'ate',
  'killed',
  'worried',
  'tossed',
  'milked',
  'kissed',
  'married',
  'woke',
  'kept',
  'belonged to'
];

export class House {
  /**
   * @param {number} n
   * @returns {Array<string>}
   */
  static verse(n) {
    return Array.from({ length: n }).map((_, index) => {
      let result = index !== 0
        ? `that ${ACTIONS[n - 1 - index]} the ${ANIMALS[n - 1 - index]}`
        : `This is the ${ANIMALS[n - 1]}`;

      if (index === n - 1) {
        result += '.';
      }

      return result;
    })
  }

  /**
   * @param {number} startVerse
   * @param {number} endVerse
   * @returns {Array<string>}
   */
  static verses(startVerse, endVerse) {
    let result = [];

    for (let i = startVerse; i <= endVerse; i++) {
      result.push(...this.verse(i));

      if (i !== endVerse) {
        result.push('');
      }
    }

    return result;
  }
}
