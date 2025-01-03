/** @typedef {[number, number]} Domino */

/** @typedef {Array<Domino>} Dominoes */

/** @typedef {Record<string, Dominoes>} RemainingCombinations */

/**
 * @typedef {Object} RemainingStartPoint
 * @property {Domino} value
 * @property {boolean} toFlip
 */

/**
 * Finds a domino chain recursively, or returns null if it doesn't exist.
 * 
 * Once multiple possible pairs are found, store them in 'currentCombination'
 * and 'remainingCombinations', and backtrack if needed.
 * 
 * @param {Dominoes} originalInput
 * @param {Dominoes} remainingDominoes - Remaining dominoes to fall back to, in
 * case current combination doesn't succeed.
 * @param {Dominoes} [processedDominoes] - Processed dominoes, flipping where necessary.
 * @param {Dominoes} [processedDominoesWithoutFlips] - Necessary to compare with
 * original input in case of backtracks.
 * @param {number} min - Defaults to 0.
 * @param {Domino} currentCombination,
 * @param {RemainingCombinations} remainingCombinations - With level and combinations.
 * @param {number} level - Defaults to 0.
 * @returns {Dominoes|null}
 */
export const chain = (
  originalInput,
  remainingDominoes = [...originalInput],
  processedDominoes = [],
  processedDominoesWithoutFlips = [],
  min = 0,
  currentCombination = [],
  remainingCombinations = {},
  level = 0,
) => {
  level++;

  // Since there will be multiple recursive calls, this function collects arguments to avoid code duplication
  const collectArgs = () => [
    originalInput,
    remainingDominoes,
    processedDominoes,
    processedDominoesWithoutFlips,
    min,
    currentCombination,
    remainingCombinations,
    level
  ];

  // Empty input results in an empty output
  if (originalInput.length < 2) {
    return handleShortInput(originalInput);
  }

  // Recursion base case: all dominoes have been processed
  if (processedDominoes.length === originalInput.length) {
    // If dominoes are connected (last domino with first), return processed dominoes, else backtrack
    const areConnected = processedDominoes.slice(-1)[0][1] === processedDominoes[0][0];

    return areConnected ? processedDominoes : backtrack(...collectArgs());
  }

  const flattenedArr = remainingDominoes.flat();

  if (min === 0) {
    min = Math.min(...flattenedArr);
  }

  processDominoesWithBothMinimalValues(remainingDominoes, processedDominoes, min, currentCombination.length);

  const allStartPointsForLevel = getRemainingStartPoints(remainingDominoes, min);

  // Current combination didn't succeed
  if (!allStartPointsForLevel.length) {
    return backtrack(...collectArgs());
  }

  remainingCombinations[level] = [];

  for (const remainingStartPoint of allStartPointsForLevel) {
    const { value, toFlip } = remainingStartPoint;

    const index = remainingDominoes.map(x => String(x)).indexOf(String(value));

    remainingDominoes.splice(index, 1);

    if (allStartPointsForLevel.length) {
      currentCombination = value;
    }

    processedDominoes.push(toFlip ? [value[1], value[0]] : value);

    processedDominoesWithoutFlips.push(value);

    // Remaining combinations minus the current one
    const rIndex = allStartPointsForLevel.map(x => String(x.value)).indexOf(String(currentCombination));
    [...allStartPointsForLevel.slice(0, rIndex), ...allStartPointsForLevel.slice(rIndex + 1)].forEach(x => {
      // Flip value if needed
      const remainingValue = x.value[1] === min ? [x.value[1], x.value[0]] : x.value;
      remainingCombinations[level].push(remainingValue);
    });

    const minIndex = toFlip ? 0 : 1;
    min = value[minIndex];

    return chain(...collectArgs());
  }

  // Only one left and it is not chain
  if (remainingCombinations.length === 1) {
    return null;
  }

  return chain(...collectArgs());
};

/**
 * In case that the current combination didn't succeed,
 * backtrack to the highest level that has untried combination.
 */
const backtrack = (
  originalInput,
  remainingDominoes,
  processedDominoes,
  processedDominoesWithoutFlips,
  min,
  currentCombination,
  remainingCombinations,
  level
) => {
  // Since same args will be used to call `chain` function, it will be spread to avoid code duplication.
  /** @param {string} - Maximum non empty level */
  const levelToBacktrackTo = String(Math.max(...Object.keys(remainingCombinations).filter(x =>
    remainingCombinations[Number(x)].length !== 0
  )));

  level = Number(levelToBacktrackTo);

  if (
    !Object.keys(remainingCombinations).length ||
    typeof (remainingCombinations[levelToBacktrackTo]) === 'undefined'
  ) {
    return null;
  }

  // Remove processed dominoes from all levels higher than the one that is backtracked to
  processedDominoes = processedDominoes.slice(0, levelToBacktrackTo - 1);
  processedDominoesWithoutFlips = processedDominoesWithoutFlips.slice(0, levelToBacktrackTo - 1);

  currentCombination = remainingCombinations[levelToBacktrackTo][0];
  remainingCombinations[levelToBacktrackTo] = remainingCombinations[levelToBacktrackTo].slice(1);
  processedDominoes.push(currentCombination);
  processedDominoesWithoutFlips.push(currentCombination);
  min = currentCombination[1];

  // New remaining dominoes will be the difference between original input and processed dominoes without flips
  const originalInputCopy = [...originalInput];

  for (const domino of processedDominoesWithoutFlips) {
    const index = originalInputCopy.indexOf(domino);
    originalInputCopy.splice(index, 1);
  }

  remainingDominoes = originalInputCopy;

  return chain(
    originalInput,
    remainingDominoes,
    processedDominoes,
    processedDominoesWithoutFlips,
    min,
    currentCombination,
    remainingCombinations,
    level
  );
}

/**
 * Handles empty input or input with just 1 pair of dominoes.
 *
 * @param {Dominoes} originalInput
 * @returns {Dominoes|null}
 */
const handleShortInput = (originalInput) => {
  if (!originalInput.length) {
    return [];
  }

  return originalInput[0][0] === originalInput[0][1] ? originalInput : null;
}

// Push dominoes with both minimal value e.g. [1, 1] to processed
const processDominoesWithBothMinimalValues = (remainingDominoes, processedDominoes, minValue) => {
  for (const [index, domino] of Object.entries(remainingDominoes)) {
    if (domino[0] === minValue && domino[1] === minValue) {
      processedDominoes.push(domino);
      remainingDominoes.splice(index, 1);
    }
  }
}

/**
 * Determines which dominoes, after flipping (if necessary), can be next in chain.
 * 
 * @param {RemainingCombinations} remainingCombinations - With level and combinations.
 * @param {number} currentValue
 * @returns {Array<RemainingStartPoint>}
 */
const getRemainingStartPoints = (remainingDominoes, currentValue) => {
  const remainingStartPoints = [];

  for (const domino of remainingDominoes) {
    const toFlip = domino[1] === currentValue;

    if (!toFlip && domino[0] !== currentValue) {
      continue;
    }

    remainingStartPoints.push({ value: domino, toFlip });
  }

  return remainingStartPoints;
}
