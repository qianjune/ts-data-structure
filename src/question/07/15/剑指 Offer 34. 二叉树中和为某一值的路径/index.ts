// 剑指 Offer 34. 二叉树中和为某一值的路径
// 解题方式：回朔法
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

function pathSum(root: TreeNode | null, target: number): number[][] {
  const ret: number[][] = [];
  const arr: number[] = [];
  function _preSumCount(root: TreeNode, curSum: number) {
    if (!root) return;
    curSum += root.val;
    arr.push(root.val);

    if (target === curSum && !root.left && !root.right) {
      ret.push([...arr]);
    }
    _preSumCount(root.left, curSum);
    _preSumCount(root.right, curSum);
    arr.pop();
  }
  _preSumCount(root, 0);
  return ret;
}
