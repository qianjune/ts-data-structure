// 98. 验证二叉搜索树
// 解题方式：中序遍历

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

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
function isValidBST(root: TreeNode | null): boolean {
  let pre: TreeNode = null;
  function _isValidBST(root: TreeNode | null): boolean {
    if (!root) return true;
    if (!_isValidBST(root.left)) return false;
    if (pre === null) pre = root;
    else if (pre.val >= root.val) return false;
    pre = root;
    return _isValidBST(root.right);
  }
  return _isValidBST(root);
}
const node = new TreeNode(0);
console.log(isValidBST(node));
export { isValidBST };
