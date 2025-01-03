class Node {
  constructor(n) {
    this.value = n;
    this.parent = null;
  }

  get data() {
    return this.value;
  }
}

export class BinarySearchTree {
  constructor(n) {
    this._head = new Node(n);
    this._left = null;
    this._right = null;
  }

  insert(n) {
    const insertRecursively = (tree, n) => {
      if (n <= tree._head.value) {
        if (tree._left === null) {
          tree._left = new BinarySearchTree(n);
        } else {
          insertRecursively(tree._left, n);
        }
      } else {
        if (tree._right === null) {
          tree._right = new BinarySearchTree(n);
        } else {
          insertRecursively(tree._right, n);
        }
      }
    };

    insertRecursively(this, n);
  }

  each(callback = null) {
    const result = [];

    // Traverse the tree in order: left, root, right
    const inOrderTraversal = (tree) => {
      if (tree !== null) {
        inOrderTraversal(tree._left);

        if (callback) {
          callback(tree._head.value);
        }

        result.push(tree._head.value);
        inOrderTraversal(tree._right);
      }
    };

    inOrderTraversal(this);

    return result;
  }

  get data() {
    return this._head.data;
  }

  get left() {
    return this._left;
  }

  get right() {
    return this._right;
  }
}
