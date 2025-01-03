class CircularBuffer {
  constructor(n) {
    this.n = n;
    this.elements = [];
    this.newestIndex = 0;
    this.oldestIndex = 0;
  }

  write(s) {
    if (this.isFull) {
      throw new BufferFullError;
    }

    this.elements.push(s);
    this.newestIndex = this.elements.length - 1;
  }

  read() {
    const oldestElement = this.elements[this.oldestIndex];

    if (typeof (oldestElement) === 'undefined') {
      if (this.newestIndex < this.oldestIndex) {
        this.oldestIndex = 0;
        return this.read();
      }

      throw new BufferEmptyError;
    }

    // Removes element
    this.elements.splice(this.oldestIndex, 1);
    this.newestIndex = Math.max(this.newestIndex - 1, 0);

    return oldestElement;
  }

  forceWrite(s) {
    if (this.isFull) {
      this.elements[this.oldestIndex] = s;
      this.newestIndex = this.oldestIndex;
      this.oldestIndex++;
    } else {
      this.write(s);
    }
  }

  clear() {
    this.elements = [];
    this.newestIndex = 0;
  }

  get isFull() {
    return this.elements.length === this.n && this.elements.every(x => typeof (x) !== 'undefined');
  }
}

export default CircularBuffer;

export class BufferFullError extends Error {
  constructor() {
    throw super('Buffer is full, remove some elements');
  }
}

export class BufferEmptyError extends Error {
  constructor() {
    throw super('Buffer is empty, cannot read');
  }
}
