export class QueenAttack {
  constructor({
    black: [blackRow, blackCol] = [],
    white: [whiteRow, whiteCol] = [],
  } = {}) {
    this.blackRow = blackRow !== undefined ? blackRow : 0;
    this.blackCol = blackCol !== undefined ? blackCol : 3;
    this.whiteRow = whiteRow !== undefined ? whiteRow : 7;
    this.whiteCol = whiteCol !== undefined ? whiteCol : 3;

    this.checkInput(this.blackRow, this.blackCol, this.whiteRow, this.whiteCol);

    this._black = [this.blackRow, this.blackCol];
    this._white = [this.whiteRow, this.whiteCol];
  }

  get black() {
    return this._black;
  }

  get white() {
    return this._white;
  }

  toString() {
    let rows = Array.from({ length: 8 }, ((_, rowIndex) => Array.from({ length: 8 }, (() => '_'))));

    rows[this.blackRow][this.blackCol] = 'B';
    rows[this.whiteRow][this.whiteCol] = 'W';

    // Turning matrix of characters into an array of strings
    return rows.map(row => row.join(' ')).join('\n');
  }

  get canAttack() {
    const areInSameRow = this.blackRow === this.whiteRow;
    const areInSameCol = this.blackCol === this.whiteCol;
    const areInSameMainDiagonal = this.blackRow - this.whiteRow === this.blackCol - this.whiteCol;
    const areInSameSideDiagonal = this.blackRow - this.whiteRow === this.whiteCol - this.blackCol;

    return areInSameRow || areInSameCol || areInSameMainDiagonal || areInSameSideDiagonal;
  }

  checkInput(...args) {
    if (args.some(x => x < 0 || x > 7)) {
      throw new Error('Queen must be placed on the board');
    }

    if (args.length === 4 && args[0] === args[2] && args[1] === args[3]) {
      throw new Error('Queens cannot share the same space');
    }
  }
}
