export class Address {
  /**
   * @param {number} houseNumber
   * @param {string} street
   * @param {string} place
   * @param {string} country
   */
  constructor(houseNumber, street, place, country) {
    this.houseNumber = houseNumber;
    this.street = street;
    this.place = place;
    this.country = country;
  }
}

export class Born {
  /**
   * @param {Address} bornAt
   * @param {Date} bornOn
   */
  constructor(bornAt, bornOn) {
    this.bornAt = bornAt;
    this.bornOn = bornOn;
  }
}

export class Lens {
  /**
   * @param {Function} getter
   * @param {Function} setter
   */
  constructor(getter, setter) {
    this.get = getter;
    this.set = setter;
  }
}

export class Name {
  /**
   * @param {string} forename
   * @param {string} surname
   */
  constructor(forename, surname) {
    this.forename = forename;
    this.surname = surname;
  }
}

export class Person {
  /**
   * @param {Name} name
   * @param {Born} born
   * @param {Address} address
   */
  constructor(name, born, address) {
    this.name = name;
    this.born = born;
    this.address = address;
  }
}

export const nameLens = new Lens(
  (person) => person.name,
  (person, name) => new Person(
    name,
    person.born,
    person.address
  ),
);

export const bornAtLens = new Lens(
  (person) => person.born.bornAt,
  (person, address) => new Person(
    person.name,
    person.born,
    address
  ),
);

export const streetLens = new Lens(
  (person) => person.address.street,
  (person, street) => new Person(
    person.name,
    person.born,
    { ...person.address, street }
  ),
);
