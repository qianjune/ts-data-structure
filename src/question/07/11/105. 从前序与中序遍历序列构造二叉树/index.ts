// 105. 从前序与中序遍历序列构造二叉树
// 解题方式：找出前序和中序的规律 （题解里有巧妙但很复杂的方式）
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
  if (preorder.length === 0 || inorder.length === 0) return null;
  // 找根节点
  const rootVal = preorder[0];
  // console.log(rootVal)
  // console.log(preorder,inorder)
  const cut = inorder.findIndex((v) => v === rootVal); // 这里可以初始化一个哈希，优化寻找
  const leftInOrder = inorder.slice(0, cut);
  const rightInOrder = inorder.slice(cut + 1, inorder.length);
  const leftPreOrder = preorder.slice(1, 1 + leftInOrder.length);
  const rightPreOrder = preorder.slice(1 + leftInOrder.length, preorder.length);
  const root = new TreeNode(
    rootVal,
    buildTree(leftPreOrder, leftInOrder),
    buildTree(rightPreOrder, rightInOrder)
  );
  return root;
}
