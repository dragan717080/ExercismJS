export class Triangle {
  constructor(...sides) {
    this.sides = sides;
  }

  get isEquilateral() {
    return this.allSidesAreValid && new Set(this.sides).size === 1;
  }

  get isIsosceles() {
    return this.allSidesAreValid && new Set(this.sides).size <= 2;
  }

  get isScalene() {
    return this.allSidesAreValid && new Set(this.sides).size >= 3;
  }

  get allSidesAreValid() {
    return this.sides.every((side, sideIndex) => side > 0 && this.sides.filter((s, i) => i !== sideIndex).reduce((acc, x) => acc + x, 0) >= side);
  }
}
