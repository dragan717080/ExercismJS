export class List {
  constructor(l=[]) {
    this.l = l;
  }

  get values() {
    return this.l;
  }

  [Symbol.iterator]() {
    let index = 0;
    const items = this.l;

    return {
      next() {
        if (index < items.length) {
          return { value: items[index++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }

  append(other) {
    this.l = [...this.l, ...other.l];
    return this;
  }

  concat(listOfLists) {
    for (const otherList of listOfLists.values) {
      this.append(otherList);
    }
    return this;
  }

  map(func) {
    const l = [];
    this.l.forEach(x => l.push(func(x)));

    this.l = l;

    return this;
  }

  filter(func) {
    const l = [];

    this.l.forEach(x => {
      if (func(x)) {
        l.push(x);
      }
    });

    this.l = l;

    return this;
  }

  length() {
    return this.l.length;
  }

  foldl(func, accStart) {
    let result = accStart;

    for (const item of this.l) {
      result = func(result, item);
    }

    return result;
  }

  foldr(func, accStart) {
    let result = accStart;

    for (const item of this.reverse()) {
      result = func(result, item);
    }

    return result;
  }

  reverse() {
    this.l = this.l.reduce((acc, x, i) => [...acc, this.l[this.l.length - i - 1]], []);

    return this;
  }
}
