export class BankAccount {
  constructor() {
    this._isOpen = false;
    this._balance = 0;
  }

  open() {
    if (this._isOpen) {
      throw new ValueError;
    }

    this._isOpen = true;
  }

  close() {
    if (!this._isOpen) {
      throw new ValueError;
    }

    this._isOpen = false;
    this._balance = 0;
  }

  deposit(n) {
    if (n < 0 || !this._isOpen) {
      throw new ValueError;
    }

    this._balance += n;
  }

  withdraw(n) {
    if (n < 0 || n > this._balance) {
      throw new ValueError;
    }

    this._balance -= n;
  }

  get balance() {
    if (!this._isOpen) {
      throw new ValueError;
    }

    return this._balance;
  }
}

export class ValueError extends Error {
  constructor() {
    super('Bank account error');
  }
}
