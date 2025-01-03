export class Rational {
  constructor(numerator, denominator) {
    this.numerator = numerator;
    this.denominator = denominator;
  }

  /**
   * @param {Rational} other
   * @returns {Rational}
   */
  add(other) {
    const newDenominator = this.getNewDenominator(this.denominator, other.denominator);
    const [q1, q2] = [newDenominator / this.denominator, newDenominator / other.denominator];

    this.numerator = this.numerator * q1 + other.numerator * q2;
    this.denominator = newDenominator;

    return this.reduce();
  }

  sub(other) {
    const newDenominator = this.getNewDenominator(this.denominator, other.denominator);
    const [q1, q2] = [newDenominator / this.denominator, newDenominator / other.denominator];

    this.numerator = this.numerator * q1 - other.numerator * q2;
    this.denominator = newDenominator;

    return this.reduce();
  }

  mul(other) {
    this.numerator *= other.numerator;
    this.denominator *= other.denominator;

    return this.reduce();
  }

  div(other) {
    this.numerator *= other.denominator;
    this.denominator *= other.numerator;

    return this.reduce();
  }

  abs() {
    return new Rational(Math.abs(this.numerator), Math.abs(this.denominator));
  }

  exprational(x) {
    this.numerator **= x;
    this.denominator **= x;

    return this.reduce();
  }

  expreal(x) {
    const result = (x ** this.numerator) ** (1 / this.denominator);

    return (result - Math.abs(result - Math.round(result))) < 0.001 ? result : Math.round(result);
  }

  reduce() {
    if (this.numerator === 0) {
      this.denominator = 1;
      return this;
    }

    const d = this.gcd(this.numerator, this.denominator);
    [this.numerator, this.denominator] = [this.numerator / d, this.denominator / d];

    if (this.denominator < 0) {
      [this.numerator, this.denominator] = [-this.numerator, -this.denominator];
    }

    return this;
  }

  /**
   * Finds a new denominator.
   * 
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  getNewDenominator(a, b) {
    const gcd = this.gcd(a, b);

    return gcd === 1 ? a * b : gcd;
  }

  gcd(a, b) {
    [a, b] = [Math.abs(a), Math.abs(b)];

    while (b) {
      [a, b] = [b, a % b];
    }

    return a;
  }
}
