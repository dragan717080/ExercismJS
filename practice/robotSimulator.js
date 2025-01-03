/** @typedef {'north' | 'south' | 'east' | 'west'} Direction */

/** @typedef {'L' | 'R' | 'A'} Instruction */

/**
 * @typedef {object} Place
 * 
 * @property {number} x
 * @property {number} y
 * @property {Direction} [direction] - North by default.
 */

export class InvalidInputError extends Error {
  constructor(message) {
    super();
    this.message = message || 'Invalid Input';
  }
}

export class Robot {
  #x;
  #y;
  #direction;

  /**
   * @param {number} [x]
   * @param {number} [y]
   */
  constructor(x = 0, y = 0, direction = 'north') {
    this.#x = x;
    this.#y = y;
    this.#direction = direction;
  }

  /** @returns {Direction} */
  get bearing() {
    return this.#direction;
  }

  /** @returns {[number, number]} */
  get coordinates() {
    return [this.#x, this.#y];
  }

  /** @param {Place} */
  place({ x, y, direction = 'north' }) {
    if (typeof (direction) !== 'undefined' && !['north', 'south', 'east', 'west'].includes(direction)) {
      throw new InvalidInputError();
    }

    this.#x = x;
    this.#y = y;
    this.#direction = direction;
  }

  /** @param {Array<Instruction>} instructions */
  evaluate(instructions) {
    [...instructions].forEach(instruction => {
      switch (instruction) {
        case 'L':
          this.turnLeft();
          break;
        case 'R':
          this.turnRight();
          break;
        case 'A':
          this.advance();
          break;
      }
    });
  }

  turnLeft() {
    this.#direction =
      this.#direction === 'north'
        ? 'west'
        : this.#direction === 'west'
          ? 'south'
          : this.#direction === 'south'
            ? 'east' : 'north';
  }

  turnRight() {
    this.#direction =
      this.#direction === 'north'
        ? 'east'
        : this.#direction === 'east'
          ? 'south'
          : this.#direction === 'south'
            ? 'west' : 'north';
  }

  advance() {
    switch (this.#direction) {
      case 'north':
        this.#y += 1;
        break;
      case 'south':
        this.#y -= 1;
        break;
      case 'east':
        this.#x += 1;
        break;
      case 'west':
        this.#x -= 1;
        break;
    }
  }
}
