// 102. 二叉树的层序遍历
// 解题方式：广度优先遍历bfs
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
  const res: number[][] = [];
  const list = [root];
  while (list.length !== 0) {
    const ret: number[] = [];
    const curLen = list.length;
    for (let i = 0; i < curLen; i++) {
      const node = list.shift();
      ret.push(node.val);
      if (node.left) list.push(node.left);
      if (node.right) list.push(node.right);
    }
    res.push(ret);
  }
  return res;
}
