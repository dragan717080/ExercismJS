const ANIMALS = ['fly', 'spider', 'bird', 'cat', 'dog', 'goat', 'cow', 'horse'];

const DESCRIPTIONS = [
  'It wriggled and jiggled and tickled inside her.',
  'How absurd to swallow a bird!',
  'Imagine that, to swallow a cat!',
  'What a hog, to swallow a dog!',
  'Just opened her throat and swallowed a goat!',
  'I don\'t know how she swallowed a cow!'
];

export class Song {
  /**
   * @param {number} n
   * @returns {string}
   */
  verse(n) {
    if (n === ANIMALS.length) {
      return this.getLastVerse();
    }

    let result = `I know an old lady who swallowed a ${ANIMALS[n - 1]}.`;

    if (n !== 1) {
      result += '\n' + DESCRIPTIONS[n - 2];
    }

    for (let i = n - 1; i > 0; i--) {
      result += `\nShe swallowed the ${ANIMALS[i]} to catch the ${ANIMALS[i - 1]}`;

      if (i === 2) {
        result += ' that wriggled and jiggled and tickled inside her';
      }

      result += '.';
    }

    result += '\nI don\'t know why she swallowed the fly. Perhaps she\'ll die.';

    return result + '\n';
  }

  /**
   * @param {number} start
   * @param {number} end
   * @returns {string}
   */
  verses(start, end) {
    const result = [];

    for (let i = start; i <= end; i++) {
      result.push(this.verse(i));
    }

    return result.join('\n') + '\n';
  }

  getLastVerse() {
    return 'I know an old lady who swallowed a horse.\nShe\'s dead, of course!\n';
  }
}
