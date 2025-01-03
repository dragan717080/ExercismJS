/** Doubly linked list. */
export class LinkedList {
  #elements;

  constructor() {
    this.#elements = [];
  }

  /** @param {number} d */
  push(d) {
    this.#elements = [...this.#elements, d];
  }

  pop() {
    const lastElement = this.#elements[this.#elements.length - 1];

    this.#elements = Array.from({ length: this.#elements.length - 1 }, (_, i) => this.#elements[i]);

    return lastElement;
  }

  shift() {
    const firstElement = this.#elements[0];

    this.#elements = this.#elements.slice(1);

    return firstElement;
  }

  /** @param {number} d */
  unshift(d) {
    this.#elements = [d, ...this.#elements];
  }

  /** @param {number} d */
  delete(d) {
    const index = this.#elements.findIndex(x => x === d);

    this.#elements = this.#elements.filter((x, i) => i !== index);
  }

  count() {
    return this.#elements.length;
  }
}
