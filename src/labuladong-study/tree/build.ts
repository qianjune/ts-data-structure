/**
 * @description 创建相关的问题
 */

import { TreeNode } from "../public/tree";

// 最大二叉树 - 节点永远是剩下的数里面最大的一个
const constructMaximumBinaryTree = (nums: number[]): TreeNode => {
  const build = (nums: number[], l: number, r: number) => {
    if (nums.length === 0) return null;
    let maxVal = -Infinity;
    let maxIndex = 0;
    for (let i = l; i < r; i++) {
      const num = nums[i];
      if (num > maxVal) {
        maxVal = num;
        maxIndex = i;
      }
    }
    const root = new TreeNode(maxVal);
    const left = build(nums, l, maxIndex);
    const right = build(nums, maxIndex + 1, r);
    root.left = left;
    root.right = right;
    return root;
  };
  return build(nums, 0, nums.length);
};

// 通过前序和中序构建一棵数
const build = (
  preOrder: number[],
  preLeft: number,
  preRight: number,
  inOrder: number[],
  inLeft: number,
  inRight: number
) => {
  const rootVal = preOrder[preLeft];
  let index = null;
  for (let i = 0; i < inOrder.length; i++) {
    if (inOrder[i] === rootVal) {
      index = i;
      break;
    }
  }
  const root = new TreeNode(rootVal);
  root.left = build(
    preOrder,
    preLeft + 1,
    preLeft + index - inLeft + 1,
    inOrder,
    inLeft,
    index
  );
  root.right = build(
    preOrder,
    preLeft + index - inLeft + 1 + 1,
    preRight,
    inOrder,
    index + 1,
    inRight
  );
  return root;
};

// 通过后续和中序构建一棵树
// 后续的最后一个是根节点，其他和上一题一样
