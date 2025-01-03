/**
 * (where n is a one-character alias for sum)
 * c = n - a - b
 * a^2 + b^2 = c^2
 * a^2 + b^2 = n^2 - 2an - 2bn + a^2 + 2ab + b^2
 * 2bn - 2ab = n^2 - 2an
 * 2b(n - a) = n(n-2a)
 * b = n/2 - an / (2(n-a))
 * 
 * @param {number} minFactor
 * @param {number} maxFactor
 * @returns {Array<Triplet>}
 */
export function triplets({ sum, minFactor=1, maxFactor=sum }) {
  let triplets = new Set();

  for (let a = 1; a < sum; a++) {
    let b = Math.floor(sum / 2 - a * sum / (2 * (sum - a)));

    if (a >= b) {
      break;
    }

    let c = sum - a - b;

    if (a ** 2 + b ** 2 === c ** 2) {
      triplets.add(new Triplet(a, b, c));
    }
  }

  return Array.from(triplets).filter(triplet => triplet.toArray().every(x => x >= minFactor && x <= maxFactor));
}

class Triplet {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  toArray() {
    return [this.a, this.b, this.c];
  }
}
