// 二叉树的直径
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

function diameterOfBinaryTree(root: TreeNode | null): number {
  const ret = { num: 0 };
  depth(root, ret);
  return ret.num;
}
function depth(root, ret: { num: number }) {
  if (!root) return 0;
  const left = depth(root.left, ret);
  const right = depth(root.right, ret);
  ret.num = Math.max(ret.num, left + right);
  return Math.max(left, right) + 1;
}
