//合并二叉树
// 解题方式： 递归

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

function mergeTrees(
  root1: TreeNode | null,
  root2: TreeNode | null
): TreeNode | null {
  if (!root1) return root2;
  if (!root2) return root1;
  const treeNode = new TreeNode(root2.val + root1.val);
  treeNode.left = mergeTrees(root1.left, root2.left);
  treeNode.right = mergeTrees(root1.right, root2.right);
  return treeNode;
}
