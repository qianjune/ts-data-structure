// 面试题 17.12. BiNode
// 难度：简单 - 高
// 要点：
// -- root.left or pre.lef

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

function convertBiNode(root: TreeNode | null): TreeNode | null {
  let pre: TreeNode = null;
  let first: TreeNode = null;
  function _preOrder(root: TreeNode | null): void {
    if (!root) return null;
    _preOrder(root.left);
    if (!first) {
      first = root;
    }
    if (!pre) {
      pre = root;
    } else {
      root.left = null;
      pre.right = root;
      pre = root;
    }
    _preOrder(root.right);
  }
  _preOrder(root);
  return first;
}
