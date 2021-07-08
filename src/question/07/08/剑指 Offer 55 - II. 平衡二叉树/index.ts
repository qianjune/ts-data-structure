// 剑指 Offer 55 - II. 平衡二叉树
// 解题方式：递归 / 二叉树 深度
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

function isBalanced(root: TreeNode | null): boolean {
  let res = true;
  function getDepth(root: TreeNode): number {
    if (!root) return 0;
    const left = getDepth(root.left);
    const right = getDepth(root.right);
    if (Math.abs(left - right) > 1) res = false;
    return Math.max(left, right) + 1;
  }
  getDepth(root);
  return res;
}
