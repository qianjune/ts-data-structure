// 剑指 Offer 32 - II. 从上到下打印二叉树 II
// 解题方式：层序遍历

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

function levelOrder(root: TreeNode | null): number[][] {
  const res = [];
  function _order(root, level = 0) {
    if (!root) return null;
    if (!res[level]) res[level] = [];
    res[level++].push(root.val);
    _order(root.left, level);
    _order(root.right, level);
  }
  _order(root);
  return res;
}
