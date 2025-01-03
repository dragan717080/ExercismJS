const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

export class ResistorColorTrio {
  /** @param {string[]} colors */
  constructor(colors) {
    this.colors = colors;
  }

  get label() {
    if (this.colors.some(x => !COLORS.includes(x))) {
      throw new Error('invalid color');
    }

    const mainValue = this.colors.slice(0, 2).reduce((acc, x, i) => acc + COLORS.findIndex(color => color === x) * 10**(1 - i), 0);

    const e = COLORS.findIndex(color => color === this.colors[2]);
    const exponent = mainValue * 10**e;

    const exponentStr = e < 2 ? '' : e < 5 ? 'kilo' : 'mega';

    // Value divided by exponent limit (1000 or 1000000)
    const s = String(exponent);
    const baseValue = e < 2 ? exponent : Number(s.slice(0, s.length % 3 || 3));

    return `Resistor value: ${baseValue} ${exponentStr}ohms`
  }
}
