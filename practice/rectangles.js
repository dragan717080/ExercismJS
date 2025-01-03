/** @typedef {[number, number]} Position */

/**
 * Valid top left edge candidates and elements they can be paired with
 * 
 * @typedef {Array<Array<Position>, Array<Array<Position>>>} EdgeCandidates
 */

/**
 * @param {Array<string>} input
 * @returns {number}
 */
export function count(input) {
  const a = input.map(row => [...row]);

  let plusPositions = [];

  a.forEach((row, i) => row.forEach((_, j) => {
    if (a[i][j] === '+') {
      plusPositions.push([i, j]);
    }
  }));

  // Get only valid top left edge candidates, and their matching potential other edges
  const [topLeftEdgeCandidates, otherEdgesCandidates] = getTopLeftEdgeCandidates(plusPositions);

  const rectangleCount = topLeftEdgeCandidates.reduce((acc, candidate, i) =>
    acc + getRectangleCountForEdge(candidate, otherEdgesCandidates[i], a), 0);

  return rectangleCount;
}

/**
 * Determine how many rectangles can be made
 * given current left edge and all plus positions.
 *
 * @param {Position} topLeftEdge
 * @param {Array<Position>} otherEdgesCandidates
 * @param {Array<Array<string>>} a - matrix of characters, to check
 * whether the rectangle is complete.
 * @returns {number}
 */
const getRectangleCountForEdge = (topLeftEdge, otherEdgesCandidates, a) => {
  // Matching top rights for the given top left edge
  const potentialTopRightEdges = otherEdgesCandidates.filter(x => x[0] === topLeftEdge[0]);

  // Convert to array of strings for fast conversion
  const otherEdgesCandidatesStr = otherEdgesCandidates.map(x => String(x));

  let result = 0;

  potentialTopRightEdges.forEach(topRightEdge => {
    let bottomEdgeRowCandidates = otherEdgesCandidates.map(x => {
      if (x[0] !== topRightEdge[0]) {
        return x[0];
      }
    });

    bottomEdgeRowCandidates = Array.from(new Set(bottomEdgeRowCandidates)).filter(Boolean);

    bottomEdgeRowCandidates.forEach(bottomRow => {
      const bottomLeftEdge = [bottomRow, topLeftEdge[1]];
      const bottomRightEdge = [bottomRow, topRightEdge[1]];

      // Turn expected bottom left and bottom right elements to string for fast comparison
      const bottomLeftEdgeStr = String(bottomLeftEdge);
      const bottomRightEdgeStr = String(bottomRightEdge);

      if (
        otherEdgesCandidatesStr.includes(bottomLeftEdgeStr) &&
        otherEdgesCandidatesStr.includes(bottomRightEdgeStr) &&
        IsRectangleComplete(a, topLeftEdge, topRightEdge, bottomLeftEdge, bottomRightEdge)
      ) {
        result++;
      }
    });
  });

  return result;
}

/**
 * @param {Array<Array<string>>} a
 * @param {Position} topLeftEdge
 * @param {Position} topRightEdge
 * @param {Position} bottomLeftEdge
 * @param {Position} bottomRightEdge
 * @returns {boolean}
 */
const IsRectangleComplete = (a, topLeftEdge, topRightEdge, bottomLeftEdge, bottomRightEdge) => {
  const elementsTopRow = Array.from({ length: topRightEdge[1] - topLeftEdge[1] - 1 }, ((_, i) => topLeftEdge[1] + i + 1));
  const isTopRowComplete = elementsTopRow.every(topCol => ['+', '-'].includes(a[topLeftEdge[0]][topCol]));

  // Check after every row/col to improve performance
  if (!isTopRowComplete) {
    return false;
  }

  const elementsBottomRow = Array.from({ length: bottomRightEdge[1] - bottomLeftEdge[1] - 1 }, ((_, i) => bottomLeftEdge[1] + i + 1));
  const isBottomRowComplete = elementsBottomRow.every(bottomCol => ['+', '-'].includes(a[bottomLeftEdge[0]][bottomCol]));

  // Check after every row/col to improve performance
  if (!isBottomRowComplete) {
    return false;
  }

  const elementsLeftVertical = Array.from({ length: bottomLeftEdge[0] - topLeftEdge[0] - 1 }, ((_, i) => topLeftEdge[0] + i + 1));
  const isLeftVerticalComplete = elementsLeftVertical.every(leftVertical => ['+', '|'].includes(a[leftVertical][topLeftEdge[1]]));

  if (!isLeftVerticalComplete) {
    return false;
  }

  const elementsRightVertical = Array.from({ length: bottomRightEdge[0] - topRightEdge[0] - 1 }, ((_, i) => topRightEdge[0] + i + 1));
  const isRightVerticalComplete = elementsRightVertical.every(rightVertical => ['+', '|'].includes(a[rightVertical][topRightEdge[1]]));

  return isRightVerticalComplete;
}

/**
 * Filter top left edge candidates to ones that have at least three
 * pluses in rows and cols that are greater or equal.

 * @param {Array<Position>} plusPositions
 * @returns {EdgeCandidates} - 2D array where each element is an array
 * of given valid top left edge candidate and candiates for other edges.
 */
const getTopLeftEdgeCandidates = (plusPositions) => {
  const maxRow = Math.max(...plusPositions.map(x => x[0]).flat());
  const maxCol = Math.max(...plusPositions.map(x => x[1]).flat());

  // All values but max are candidates for top left edge, max can be only right
  const topLeftEdgeCandidates = plusPositions.filter(x => x[0] !== maxRow && x[1] !== maxCol);

  // Remaining top left edge candidates
  const remainingCandidates = [];

  // Remaining other edges candidates
  const otherEdgesCandidates = [];

  topLeftEdgeCandidates.forEach(candidate => {
    // Edges that, with given top left edge, form a rectangle
    const remainingPotentialEdges = plusPositions.reduce((acc, x) => {
      const isNotSamePosition = String(x) !== String(candidate);
      const areGreaterCoordinates = x[0] >= candidate[0] && x[1] >= candidate[1];

      if (isNotSamePosition && areGreaterCoordinates) {
        acc.push(x);
      }

      return acc;
    }, []);

    // There must be at least three other edges
    if (remainingPotentialEdges.length >= 3) {
      remainingCandidates.push(candidate);
      otherEdgesCandidates.push(remainingPotentialEdges);
    }
  });

  return [remainingCandidates, otherEdgesCandidates];
}
