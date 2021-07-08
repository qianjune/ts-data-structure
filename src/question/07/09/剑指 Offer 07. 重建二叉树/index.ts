// 剑指 Offer 07. 重建二叉树
// 解题方式：递归 / 分治
// 难度：中等
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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  const map = new Map();

  // root 针对preOrder,left,right 针对inOrder
  function recur(root: number, left: number, right: number) {
    if (left > right) return null;
    const node = new TreeNode(preorder[root]);
    const i = map.get(preorder[root]);
    node.left = recur(root + 1, left, i - 1);
    node.right = recur(root + 1 + i - left, i + 1, right);
    return node;
  }
  for (let i = 0; i < inorder.length; i++) {
    map.set(inorder[i], i);
  }
  return recur(0, 0, inorder.length - 1);
}
