export class Crypto {
  /** @param {string} message */
  constructor(message) {
    this.message = message;
  }

  get ciphertext() {
    this.message = [...this.message.toLowerCase()].filter(c => /[A-Za-z\d]/.test(c));
    this.n = this.message.length;

    if (this.n === 0) {
      return '';
    }

    const [c, r] = this.#getRectangleValues();

    const a = Array.from({ length: r }, ((_, i) => Array.from({ length: c }, ((_, j) =>
      this.message[i * c + j] || ' '
    ))));

    const transposed = transpose(a).map(row => row.join(''));

    return transposed.join(' ');
  }

  // Get coefficients r and c which will be rectangle dimensions, r * c >= message.length, c >= r, c - r <= 1
  #getRectangleValues() {
    const c = Math.ceil(Math.sqrt(this.n));
    const r = Math.ceil(this.n / c);

    return [c, r];
  }
}

const transpose = (a) => a[0].map((_, colIndex) => a.map(row => row[colIndex]));
