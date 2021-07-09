// 剑指 Offer 32 - I. 从上到下打印二叉树
// 解题方式： 层序遍历
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

function levelOrder(root: TreeNode | null): number[] {
  if (!root) return [];
  const list = [];
  const res = [];
  list.push(root);
  while (list.length !== 0) {
    const node = list.shift();
    res.push(node.val);
    if (node.left) list.push(node.left);
    if (node.right) list.push(node.right);
  }
  return res;
}
