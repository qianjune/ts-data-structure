/**
 * @description 不同的问题用不同的order方式
 */

import { TreeNode } from "../public/tree";

// 找出所有重复的子树
// 因为要知道某个节点的子树，用后续
const map = new Map();
const res = [];
const traverse = (root: TreeNode): string => {
  if (!root) return "#";
  const left = traverse(root.left);
  const right = traverse(root.right);
  const subTreeStr = `${left},${right},${root.val}`;
  const amount = map.get(subTreeStr) || 0;
  // 只有变成1的时候加入，反正重复加入
  if (amount === 1) {
    res.push(root);
  }
  map.set(subTreeStr, amount + 1);
  return subTreeStr;
};
