// 337. 打家劫舍 III
// 解题方式：动态规划 + 哈希解决重复计算

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
// function _rob(root: TreeNode, map: Map<TreeNode, number>) {
//   if (!root) return 0;
//   if (map.has(root)) return map.get(root);
//   let res = root.val;
//   if (root.left) {
//     res += _rob(root.left.left, map) + _rob(root.left.right, map);
//   }
//   if (root.right) {
//     res += _rob(root.right.left, map) + _rob(root.right.right, map);
//   }
//   const result = Math.max(res, _rob(root.left, map) + _rob(root.right, map));
//   map.set(root, result);
//   return result;
// }
// function rob(root: TreeNode | null): number {
//   const map = new Map();
//   return _rob(root, map);
// }

// 我们使用一个大小为 2 的数组来表示 int[] res = new int[2] 0 代表不偷，1 代表偷
// 任何一个节点能偷到的最大钱的状态可以定义为

// 当前节点选择不偷：当前节点能偷到的最大钱数 = 左孩子能偷到的钱 + 右孩子能偷到的钱
// 当前节点选择偷：当前节点能偷到的最大钱数 = 左孩子选择自己不偷时能得到的钱 + 右孩子选择不偷时能得到的钱 + 当前节点的钱数

function _rob(root: TreeNode): number[] {
  if (!root) return [0, 0];
  const res: number[] = Array(2).fill(0);
  const left = _rob(root.left);
  const right = _rob(root.right);
  res[0] = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
  res[1] = left[0] + right[0] + root.val;

  return res;
}
function rob(root: TreeNode | null): number {
  const res: number[] = _rob(root);
  return Math.max(res[0], res[1]);
}
