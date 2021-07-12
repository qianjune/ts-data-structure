// 538. 把二叉搜索树转换为累加树
// 解题方式：后续遍历

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

function convertBST(root: TreeNode | null): TreeNode | null {
  const curNode = null;
  let sum = 0;
  function _postOrder(root) {
    if (!root) return null;
    _postOrder(root.right);
    sum += root.val;
    root.val = sum;
    _postOrder(root.left);
  }
  _postOrder(root);

  return root;
}
