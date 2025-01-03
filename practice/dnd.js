/**
 * @param {number} n
 * @returns {number}
 */
export const abilityModifier = (n) => {
  if (n < 3) {
    throw new Error('Ability scores must be at least 3');
  } else if (n > 18) {
    throw new Error('Ability scores can be at most 18');
  }

  return Math.floor((n - 10) / 2);
};

export class Character {
  #strength;
  #dexterity;
  #constitution;
  #intelligence;
  #wisdom;
  #charisma;

  /** @returns {number} */
  static rollAbility() {
    // Min and max both inclusive
    const randrange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const rolls = Array.from({ length: 4 }, (_ => randrange(1, 6))).toSorted((a, b) => b - a).slice(0, 3);

    return rolls.reduce((acc, x) => acc + x, 0);
  }

  constructor() {
    this.#strength = Character.rollAbility();
    this.#dexterity = Character.rollAbility();
    this.#constitution = Character.rollAbility();
    this.#intelligence = Character.rollAbility();
    this.#wisdom = Character.rollAbility();
    this.#charisma = Character.rollAbility();
  }

  get strength() {
    return this.#strength;
  }

  get dexterity() {
    return this.#dexterity;
  }

  get constitution() {
    return this.#constitution;
  }

  get intelligence() {
    return this.#intelligence;
  }

  get wisdom() {
    return this.#wisdom;
  }

  get charisma() {
    return this.#charisma;
  }

  get hitpoints() {
    return 10 + abilityModifier(this.#constitution);
  }
}
