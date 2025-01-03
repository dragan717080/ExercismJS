/**
 * @typedef {object} User
 * @property {string} name
 * @property {Record<string, number>} owes
 * @property {Record<string, number>} owed_by
 * @property {number} balance
 */

/** @typedef {Record<'users', Array<User>} UsersRecord */

/**
 * @typedef {object} IOU
 * @property {string} lender
 * @property {string} borrower
 * @property {number} amount
 */

export class RestAPI {
  /** @param {UsersRecord} usersRecord */
  constructor(usersRecord) {
    const { users } = usersRecord;
    this._users = users;
  }

  get users() {
    return JSON.parse(JSON.stringify({ users: this._users }, null, 2));
  }

  /**
   * @param {string} url
   * @returns {Array<User>}
   */
  get(url) {
    const params = new URLSearchParams(url);
    const users = Array.from(params.values()).filter(Boolean);
    const username = users[0];

    if (!username) {
      this._users = this._users.toSorted((a, b) => a.name.localeCompare(b.name));
      return this.users
    }

    this._users = this._users.filter(user => user.name === username);
    return this.users;
  }

  /**
   * @param {string} url
   * @param {User} payload
   * @returns {User}
   */
  post(url, payload) {
    return url === '/add' ? this.createUser(payload) : this.createIou(payload)
  }

  createUser(payload) {
    const { user: name } = payload;

    if (this._users.filter(user => user.name === name).length) {
      throw new Error(`User ${name} already exists.`);
    }

    const user = {
      name,
      owes: {},
      owed_by: {},
      balance: 0,
    }

    this._users = [
      ...this._users,
      user
    ];

    return user;
  }

  createIou(payload) {
    const { lender, borrower, amount } = payload;
    const lenderIndex = this._users.findIndex(user => user.name === lender);
    const lenderOwedBy = this._users[lenderIndex].owed_by;

    const newAmount = Object.keys(this._users[lenderIndex].owed_by).includes(borrower)
      ? lenderOwedBy[borrower] + amount
      : amount;

    const lenderOwedToBorrowerAmount = (Object.entries(this._users[lenderIndex].owes)
      .find(([k]) => k === borrower) || [null, 0])[1];

    this._users[lenderIndex].owed_by[borrower] = newAmount - lenderOwedToBorrowerAmount;
    this._users[lenderIndex].balance += amount;

    const borrowerIndex = this._users.findIndex(user => user.name === borrower);

    this._users[lenderIndex].owes[borrower] = lenderOwedToBorrowerAmount - newAmount;
    this._users[borrowerIndex].owes[lender] = newAmount - lenderOwedToBorrowerAmount;
    this._users[borrowerIndex].owed_by[lender] = lenderOwedToBorrowerAmount - newAmount;

    const sign = Math.sign(newAmount - lenderOwedToBorrowerAmount);

    if (sign === -1) {
      delete this._users[lenderIndex].owed_by[borrower];
      delete this._users[borrowerIndex].owes[lender];
    } else if (sign === 0) {
      delete this._users[lenderIndex].owed_by[borrower];
      delete this._users[borrowerIndex].owes[lender];
      delete this._users[lenderIndex].owes[borrower];
      delete this._users[borrowerIndex].owed_by[lender];
    } else {
      delete this._users[lenderIndex].owes[borrower];
      delete this._users[borrowerIndex].owed_by[lender];
    }

    this._users[borrowerIndex].balance -= amount;

    return { users: this._users.filter(x => x.name === borrower || x.name === lender) };
  }
}
