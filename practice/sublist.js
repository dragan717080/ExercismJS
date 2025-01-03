/** @typedef {Array<number>} List */

/** 
 * A class representing a list of numbers.
 */
export class List {
  /** @param {Array<number>} l */
  constructor(l) {
    this.l = l ?? [];
  }

  /** 
   * @param {List} l1 - The first list to compare.
   * @param {List} l2 - The second list to compare.
   * @returns {boolean} True if both lists are identical, false otherwise.
   */
  compare(l2) {
    const [n1, n2] = [this.l.length, l2.l.length];

    return n1 > n2
      ? this.checkForSuperList(this.l, l2.l)
      : n1 < n2
        ? this.checkForSubList(this.l, l2.l)
        : this.checkForEqual(this.l, l2.l) ? 'EQUAL' : 'UNEQUAL';
  }

  checkForSuperList(l1, l2) {
    let isSuperList = false;

    for (let i in l1) {
      i = Number(i);

      if (this.checkForEqual(l1.slice(i, i + l2.length), l2)) {
        isSuperList = true;
        break;
      }
    }

    return isSuperList ? 'SUPERLIST' : 'UNEQUAL';
  }

  checkForSubList(l1, l2) {
    let isSublist = false;

    for (let i in l2) {
      i = Number(i);

      if (this.checkForEqual(l2.slice(i, i + l1.length), l1)) {
        isSublist = true;
        break;
      }
    }

    return isSublist ? 'SUBLIST' : 'UNEQUAL';
  }

  checkForEqual(l1, l2) {
    return l1.every((d, i) => d === l2[i])
  }
}
