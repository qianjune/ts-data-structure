// 114. 二叉树展开为链表
// 解题方式：后序遍历

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

/**
 Do not return anything, modify root in-place instead.
 */
function flatten(root: TreeNode | null): void {
  let pre: TreeNode = null;
  function _postrder(root: TreeNode) {
    if (!root) return null;
    _postrder(root.right);
    _postrder(root.left);
    root.left = null;
    root.right = pre;
    pre = root;
  }
  _postrder(root);
}
