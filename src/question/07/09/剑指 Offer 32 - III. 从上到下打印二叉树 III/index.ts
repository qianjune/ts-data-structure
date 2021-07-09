// 剑指 Offer 32 - III. 从上到下打印二叉树 III
// 解题方式：层序遍历 + 双端队列
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
  if (!root) return [];
  const list = [];
  const res = [];
  let temp = [];
  list.push(root);
  while (list.length !== 0) {
    temp = [];
    for (let i = list.length; i > 0; i--) {
      const node = list.shift();
      if ((res.length + 1) % 2 === 0) temp.unshift(node.val);
      else temp.push(node.val);
      if (node.left) list.push(node.left);
      if (node.right) list.push(node.right);
    }
    res.push(temp);
  }
  return res;
}
