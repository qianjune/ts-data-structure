// 对称二叉树
// 解题方式：递归
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// root的左孩子使用前序遍历，有孩子使用后序遍历
function isSymmetric(root: TreeNode | null): boolean {
  const left: number[] = [];
  const right: number[] = [];

  _preOrder(root.left, left);
  _postOrder(root.right, right);
  console.log(left, right);
  if (left.length !== right.length) return false;
  for (let i = 0; i < left.length; i++) {
    if (left[i] !== right[i]) {
      return false;
    }
  }
  return true;
}
function _preOrder(node: TreeNode, arr: number[]) {
  if (node === null) {
    arr.push(null);
    return;
  }
  arr.push(node.val);
  _preOrder(node.left, arr);
  _preOrder(node.right, arr);
}

function _postOrder(node: TreeNode, arr: number[]) {
  if (node === null) {
    arr.push(null);
    return;
  }
  arr.push(node.val);
  _postOrder(node.right, arr);
  _postOrder(node.left, arr);
}
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.left.left = new TreeNode(3);
root.left.right = new TreeNode(4);
root.right = new TreeNode(2);
root.right.right = new TreeNode(3);
root.right.left = new TreeNode(4);
isSymmetric(root);

export { isSymmetric };
