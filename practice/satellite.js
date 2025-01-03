/** 
 * @typedef {Object} Tree
 * @property {number} value
 * @property {string|Tree} left
 * @property {string|Tree} right
 */

const createNewTree = (root) => ({
  value: root,
  left: {},
  right: {}
});

/**
 * @param {Array<string>} preorder
 * @param {Array<string>} inorder
 * @returns {Tree}
 */
export const treeFromTraversals = (preorder, inorder) => {
  checkInput(preorder, inorder);

  if (preorder.length === 0) {
    return {};
  }

  const rootValue = preorder[0];
  const result = createNewTree(rootValue);

  const rootIndex = inorder.indexOf(rootValue);

  const inorderLeft = inorder.slice(0, rootIndex);
  const inorderRight = inorder.slice(rootIndex + 1);

  const preorderLeft = preorder.slice(1, 1 + inorderLeft.length);
  const preorderRight = preorder.slice(1 + inorderLeft.length);

  // Recursively build the left and right subtrees
  result.left = inorderLeft.length ? treeFromTraversals(preorderLeft, inorderLeft) : {};
  result.right = inorderRight.length ? treeFromTraversals(preorderRight, inorderRight) : {};

  return result;
};

/**
 * @param {Array<string>} preorder
 * @param {Array<string>} inorder
 * @returns {void}
 */
const checkInput = (preorder, inorder) => {
  if (preorder.length !== inorder.length) {
    throw new Error('traversals must have the same length');
  }

  const preorderSet = new Set(preorder);
  const inorderSet = new Set(inorder);

  if (preorderSet.size !== preorder.length || inorderSet.size !== inorder.length) {
    throw new Error('traversals must contain unique items');
  }

  const areSetsEqual = [...preorderSet].every(value => inorderSet.has(value));

  if (!areSetsEqual) {
    throw new Error('traversals must have the same elements');
  }
}
