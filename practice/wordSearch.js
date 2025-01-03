class WordSearch {
  /** @param {Array<string>} grid */
  constructor(grid) {
    this.grid = grid.map(row => [...row]);
  }

  /**
   * @param {Array<string>} words
   * @returns {Record<string, Record<string, Array<number> | undefined>>}
   */
  find(words) {
    let result = Object.fromEntries(words.map(word => [word, undefined]));

    words.forEach(word => {
      const candidatesIndices = this.getCandidatesIndices(word);

      candidatesIndices.forEach(([i, j]) => {
        const args = [i, j, word, result];

        const _ =
          this.checkLeftToRight(...args) ||
          this.checkRightToLeft(...args) ||
          this.checkTopToBottom(...args) ||
          this.checkBottomToTop(...args) ||
          this.checkTopLeftToBottomRight(...args) ||
          this.checkBottomRightToTopLeft(...args) ||
          this.checkBottomLeftToTopRight(...args) ||
          this.checkTopRightToBottomLeft(...args);
      });
    });

    return result;
  }

  checkLeftToRight(i, j, word, result) {
    const isMatch = this.grid[i].slice(j, j + word.length).join('') === word;

    if (isMatch) {
      result[word] = { start: [i + 1, j + 1], end: [i + 1, j + word.length] };
    }

    return isMatch;
  }

  checkRightToLeft(i, j, word, result) {
    const start = j - word.length + 1;

    if (start < 0) {
      return false;
    }

    const isMatch = this.grid[i].slice(j - word.length + 1, j + 1).every((c, i) => c === word[word.length - i - 1]);

    if (isMatch) {
      result[word] = { start: [i + 1, j + 1], end: [i + 1, j - word.length + 2] };
    }

    return isMatch;
  }

  checkTopToBottom(i, j, word, result) {
    if (i + word.length > this.grid.length) {
      return false;
    }

    const isMatch = Array.from({ length: word.length }, ((_, rowIndex) => this.grid[rowIndex][j])).join('') === word;

    if (isMatch) {
      result[word] = { start: [i + 1, j + 1], end: [i + word.length, j + 1] };
    }

    return isMatch;
  }

  checkBottomToTop(i, j, word, result) {
    if (i < word.length - 1) {
      return false;
    }

    const isMatch = Array.from({ length: word.length }, ((_, rowIndex) => this.grid[i - rowIndex][j])).join('') === word;

    if (isMatch) {
      result[word] = { start: [i + 1, j + 1], end: [i - word.length + 2, j + 1] };
    }

    return isMatch;
  }

  checkTopLeftToBottomRight(i, j, word, result) {
    const availableRows = this.grid.length - i;
    const availableCols = this.grid[0].length - j;

    if (Math.min(availableRows, availableCols) < word.length) {
      return false;
    }

    const isMatch = Array.from({ length: word.length }, ((_, rowIndex) => this.grid[i + rowIndex][j + rowIndex])).join('') === word;

    if (isMatch) {
      result[word] = { start: [i + 1, j + 1], end: [i + word.length, j + word.length] };
    }

    return isMatch;
  }

  checkBottomRightToTopLeft(i, j, word, result) {
    if (i < word.length - 1 || j < word.length - 1) {
      return false;
    }

    const isMatch = Array.from({ length: word.length }, ((_, rowIndex) => this.grid[i - rowIndex][j - rowIndex])).join('') === word;

    if (isMatch) {
      result[word] = { start: [i + 1, j + 1], end: [i - word.length + 2, j - word.length + 2] };
    }

    return isMatch;
  }

  checkBottomLeftToTopRight(i, j, word, result) {
    if (i < word.length - 1 || this.grid[0].length - j < word.length) {
      return false;
    }

    const isMatch = Array.from({ length: word.length }, ((_, rowIndex) => this.grid[i - rowIndex][j + rowIndex])).join('') === word;

    if (isMatch) {
      result[word] = { start: [i + 1, j + 1], end: [i - word.length + 2, j + word.length] };
    }

    return isMatch;
  }

  checkTopRightToBottomLeft(i, j, word, result) {
    if (i + word.length > this.grid.length || j - word.length + 1 < 0) {
      return false;
    }

    const isMatch = Array.from({ length: word.length }, ((_, rowIndex) => this.grid[i + rowIndex][j - rowIndex])).join('') === word;

    if (isMatch) {
      result[word] = { start: [i + 1, j + 1], end: [i + word.length, j - word.length + 2] };
    }

    return isMatch;
  }

  /**
   * Gets indices for matching first letter of searched word
   * 
   * @param {string} word
   * @returns {Array<Array<number>>}
   */
  getCandidatesIndices(word) {
    return this.grid
    .flatMap((row, i) => row.map((_, j) => (this.grid[i][j] === word[0] ? [i, j] : null)))
    .filter(Boolean);
  }
}

export default WordSearch;
