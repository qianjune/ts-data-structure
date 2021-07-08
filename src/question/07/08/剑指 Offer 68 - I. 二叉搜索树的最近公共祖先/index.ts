// 剑指 Offer 68 - I. 二叉搜索树的最近公共祖先
// 解题方式：迭代 / 递归

// 若 rootroot 是 p,qp,q 的 最近公共祖先 ，则只可能为以下情况之一：

// pp 和 qq 在 rootroot 的子树中，且分列 rootroot 的 异侧（即分别在左、右子树中）；
// p = rootp=root，且 qq 在 rootroot 的左或右子树中；
// q = rootq=root，且 pp 在 rootroot 的左或右子树中；

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
function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  // 让p<q
  if (p.val > q.val) {
    const temp = p;
    p = q;
    q = temp;
  }
  while (root) {
    if (root.val < p.val) {
      root = root.right;
    } else if (root.val > q.val) {
      root = root.left;
    } else {
      break;
    }
  }
  return root;
}
