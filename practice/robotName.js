const uniqueNames = [];

export class Robot {
  #name;

  constructor() {
    this.#name = this.generateUniqueName(); // Generate unique name on initialization
  }

  get name() {
    return this.#name;
  }

  generateUniqueName() {
    let uniqueName;

    const generateRandomName = () => Array(5).fill(1).reduce((acc, _, index) => {
      const c = index < 2
        ? String.fromCharCode(65 + Math.floor(Math.random() * 26))
        : Math.floor(Math.random() * 10);

      return acc + c;
    }, '');

    while (uniqueNames.includes(uniqueName) || typeof(uniqueName) === 'undefined') {
      uniqueName = generateRandomName();
    }

    uniqueNames.push(uniqueName);

    return uniqueName;
  }

  reset() {
    this.#name = this.generateUniqueName();
  }
}

Robot.releaseNames = () => {};
