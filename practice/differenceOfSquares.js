export class Squares {
  constructor(n) {
    this.n = n;
  }

  get sumOfSquares() {
    return range(1, this.n + 1).reduce((acc, x) => acc + x**2, 0);
  }

  get squareOfSum() {
    return (range(1, this.n + 1).reduce((acc, x) => acc + x, 0))**2;
  }

  get difference() {
    return this.squareOfSum - this.sumOfSquares;
  }
}

const range = (start, stop, step = 1) =>
  Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)
