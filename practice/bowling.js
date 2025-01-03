export class Bowling {
  #frames = 0;
  #throwsInFrame;
  #score;
  #scorePreviousThrow;
  #sparePreviousThrow;
  #lastTwoStrikes;
  #isGameOver;

  // Whether the game had a strike at all
  #thereWasStrike;

  constructor() {
    this.#score = 0;
    this.#frames = 0;
    this.#scorePreviousThrow = 0;
    this.#thereWasStrike = false;
    this.#sparePreviousThrow = false;
    this.#lastTwoStrikes = [false, false];
    this.#isGameOver = false;

    this.newFrame();
  }

  newFrame() {
    this.#frames++;
    this.#throwsInFrame = 0;
  }

  roll(n) {
    this.checkInput(n);

    let isLastFrame = this.#frames === 10;

    // If is not last frame, go to new frame after two throws
    if (!isLastFrame && this.#throwsInFrame === 2) {
      this.newFrame();
      isLastFrame = this.#frames === 10;
    }

    const previousScoreForFrame = this.#throwsInFrame === 0 ? 0 : this.#scorePreviousThrow;

    if (!isLastFrame && previousScoreForFrame + n > 10) {
      throw new Error('Pin count exceeds pins on the lane');
    }

    if (!isLastFrame || this.#throwsInFrame < 2) {
      this.applyStrikeBonuses(n, isLastFrame);
      this.applySpareBonuses(n, previousScoreForFrame);
    }

    // Normal processing for throws
    this.#throwsInFrame++;
    this.#score += n;

    this.checkStrike(n, isLastFrame);

    // Handle the 10th frame separately
    if (isLastFrame) {
      this.calculateTenthFrame(n, previousScoreForFrame);
      return;
    }

    this.#scorePreviousThrow = n;

    this.checkSpare(n, previousScoreForFrame, isLastFrame);
  }

  // Special case handling for the 10th frame
  calculateTenthFrame(n, previousScoreForFrame) {
    if (this.#throwsInFrame === 2) {
      this.checkSpare(n, previousScoreForFrame, true);
    }

    const lastPinIndex = this.#thereWasStrike || this.#sparePreviousThrow ? 3 : 2;

    if (this.#throwsInFrame > lastPinIndex) {
      throw new Error('Cannot roll after game is over');
    }

    if (this.#throwsInFrame === 1) {
      this.#thereWasStrike = n === 10;
    }

    const lastTwoElementsCheck = this.#throwsInFrame === lastPinIndex;
    const strikeFulfillment = lastTwoElementsCheck && this.#thereWasStrike && this.#scorePreviousThrow !== 10;

    if (this.#thereWasStrike && this.#throwsInFrame === 3 && strikeFulfillment && n + this.#scorePreviousThrow > 10) {
      throw new Error('Pin count exceeds pins on the lane');
    }

    this.#scorePreviousThrow = n;
    this.#isGameOver = this.#throwsInFrame === lastPinIndex;
  }

  // Apply bonus for strike from the previous throw
  applyStrikeBonuses(n) {
    this.#score += this.#lastTwoStrikes[1] === 10 ? n : 0;
    this.#score += this.#lastTwoStrikes[0] === 10 ? n : 0;
  }

  applySpareBonuses(n) {
    this.#score += this.#sparePreviousThrow ? n : 0;
  }

  checkSpare(n, previousScoreForFrame) {
    this.#sparePreviousThrow = previousScoreForFrame > 0 && previousScoreForFrame + n === 10;
  }

  checkStrike(n, isLastFrame) {
    this.#lastTwoStrikes.shift();
    this.#lastTwoStrikes.push(!isLastFrame ? n : false);

    if (isLastFrame && this.#throwsInFrame > 1) {
      return;
    }

    if (n === 10) {
      this.#thereWasStrike = true;

      if (!isLastFrame) {
        this.newFrame();
      }
    }

    this.#thereWasStrike = n === 10;
  }

  checkInput(n) {
    if (n < 0) {
      throw new Error('Negative roll is invalid');
    }

    if (n > 10) {
      throw new Error('Pin count exceeds pins on the lane');
    }

    if (this.#isGameOver) {
      throw new Error('Cannot roll after game is over');
    }
  }

  score() {
    if (!this.#isGameOver) {
      throw new Error('Score cannot be taken until the end of the game');
    }

    return this.#score;
  }
}
