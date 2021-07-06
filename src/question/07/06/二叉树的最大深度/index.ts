// 二叉树的最大深度
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

function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  return _order(root);
}
function _order(node) {
  if (!node) {
    return 0;
  }

  const leftHeight = _order(node.left);
  const rightHeight = _order(node.right);
  return Math.max(leftHeight, rightHeight) + 1;
}
