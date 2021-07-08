// 剑指 Offer 54. 二叉搜索树的第k大节点
// 解题方式： 反前序遍历 + 迭代 提前返回

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

function kthLargest(root: TreeNode | null, k: number): number {
  let res: number = null;

  function _inOrder(root: TreeNode) {
    if (!root) return null;
    console.log(res);
    if (res !== null) return;

    _inOrder(root.right);
    // console.log(k)
    if (--k === 0) {
      console.log(root.val);
      res = root.val;
      return;
    }
    _inOrder(root.left);
  }
  _inOrder(root);
  return res;
}
