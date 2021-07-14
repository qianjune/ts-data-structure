// 剑指 Offer 26. 树的子结构
// 解题方式：先序遍历 + 判断
// 先找到a里包含b的节点，然后判断是否相同

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
function recur(A: TreeNode | null, B: TreeNode | null): boolean {
  if (!B) return true;
  if (!A || A.val !== B.val) return false;
  return recur(A.left, B.left) && recur(A.right, B.right);
}
function isSubStructure(A: TreeNode | null, B: TreeNode | null): boolean {
  return (
    !!A &&
    !!B &&
    (recur(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B))
  );
}
const root = new TreeNode(-1);
root.left = new TreeNode(3);
root.right = new TreeNode(3);
root.left.left = new TreeNode(3);
console.log(isSubStructure(root, null));
export { isSubStructure };
