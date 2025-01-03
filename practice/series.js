export class Series {
  /**
   * @param {string} series 
   */
  constructor(series) {
    if (!series) {
      throw new Error('series cannot be empty');
    }

    this.series = series;
  }

  /**
   * @param {number} sliceLength
   * @returns {Array<Array<number>>}
   */
  slices(sliceLength) {
    if (sliceLength < 0) {
      throw new Error('slice length cannot be negative');
    } else if (sliceLength === 0) {
      throw new Error('slice length cannot be zero');
    } else if (sliceLength > this.series.length) {
      throw new Error('slice length cannot be greater than series length');
    }

    return Array.from({ length: this.series.length - sliceLength + 1 }).map((_, i) => [...this.series.slice(i, i + sliceLength)].map(x => parseInt(x)));
  }
}
