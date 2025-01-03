export class Matrix {
  /**
   * @param {string} lines
   */
  constructor(lines) {
    this.a = lines.split('\n').map(line => line.split(' ').map(c => parseInt(c)));
  }

  /**
   * @param {number} index
   * @returns {Array<number>}
   */
  get rows() {
    return this.a;
  }

  /**
   * @param {number} index
   * @returns {Array<number>}
   */
  get columns() {
    return this.a[0].map((_, colIndex) => this.a.map(row => row[colIndex]));
  }
}
