export class Forth {
  #customOperations;

  constructor() {
    this._stack = [];
    this.#customOperations = {};
  }

  /** @param {string} s */
  evaluate(s) {
    const units = s.split(' ');

    if (s[0] === ':') {
      return this.defineNewOperation(units);
    }

    units.forEach(unit => {
      let n = Number(unit);
      !isNaN(n) ? this._stack.push(n) : this.handleOperation(unit.toUpperCase());
    })
  }

  defineNewOperation(units) {
    let [customOperationName, subOperations] = [units[1].toUpperCase(), units.slice(2, units.length - 1)];
    subOperations = subOperations.map(suboperation => !isNaN(Number(suboperation)) ? Number(suboperation) : suboperation.toUpperCase());

    if (Number(customOperationName)) {
      throw new Error('Invalid definition');
    }

    // If new operation has suboperations that are custom operations, execute them
    subOperations.forEach((suboperation, index) => {
      if (Object.keys(this.#customOperations).includes(suboperation)) {
        subOperations[index] = this.#customOperations[suboperation];
      }
    })

    subOperations = subOperations.flatMap(x => x);

    this.#customOperations = { ...this.#customOperations, [customOperationName]: subOperations };
  }

  handleOperation(operation) {
    const n = Number(operation);

    if (n) {
      this._stack.push(n);
      return;
    }

    const [a, b] = [this._stack.slice(-2)[0], this._stack.slice(-1)[0]];

    if (this.checkIfCustomOperation(operation)) {
      return;
    }

    if (['+', '-', '*', '/'].includes(operation)) {
      if (this._stack.length < 2) {
        throw new Error('Stack empty');
      }

      if (operation === '/' && b === 0) {
        throw new Error('Division by zero');
      }

      this._stack = [Math.floor(eval(`${a} ${operation} ${b}`))];
    } else {
      switch (operation) {
        case 'DUP':
          if (!this._stack.length) {
            throw new Error('Stack empty');
          }

          this._stack = [...this._stack, b];
          break;
        case 'DROP':
          if (!this._stack.length) {
            throw new Error('Stack empty');
          }

          this._stack.pop();
          break;
        case 'SWAP':
          if (this._stack.length < 2) {
            throw new Error('Stack empty');
          }

          const temp = this._stack[this._stack.length - 2];
          this._stack[this._stack.length - 2] = this._stack[this._stack.length - 1];
          this._stack[this._stack.length - 1] = temp;
          break;
        case 'OVER':
          if (this._stack.length < 2) {
            throw new Error('Stack empty');
          }

          this._stack.push(this._stack.slice(-2)[0]);
          break;
        default:
          throw new Error('Unknown command');
      }
    }
  }

  checkIfCustomOperation(operation) {
    const customOperation = this.#customOperations[operation];

    if (customOperation) {
      customOperation.forEach(x => this.handleOperation(!isNaN(Number(x)) ? x : x.toUpperCase()));

      return true;
    }

    return false;
  }

  get stack() {
    return this._stack;
  }
}
