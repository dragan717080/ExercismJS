export class Element {
  constructor(value) {
    this._value = value;
    this._next = null;
  }

  get value() {
    return this._value;
  }

  get next() {
    return this._next;
  }
}

export class List {
  constructor(l=[]) {
    this.elements = [];
    this._head = null;
    this._length = 0;

    // Can be initialized with an array
    for (let element of l) {
      element = new Element(element);
      this.add(element);
    }
  }

  add(element) {
    element._next = this._head;
    this._head = element;
    this._length++;
  }

  get length() {
    return this._length;
  }

  get head() {
    return this._head;
  }

  toArray() {
    const result = Array.from(this._head);

    let current = this._head;

    while (current) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }

  reverse() {
    return new List(this.toArray());
  }
}
