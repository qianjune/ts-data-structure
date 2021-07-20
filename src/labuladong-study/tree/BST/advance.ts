/**
 * @description 列出所有可以组合出来的二叉搜索树
 * 难度：高
 */

import { LinkedList } from "@src/data-structure/linkedList";
import { LinkedListUtil } from "@src/labuladong-study/linkedList/util";
import { TreeNode } from "@src/labuladong-study/public/tree";

// 不同的二叉搜索树
// 题意：列出所有二叉搜索树的组合可能数量

const numTrees = (num: number) => {
  let res = 0;
  const memo: number[][] = Array(num)
    .fill(0)
    .map((_) => Array(num).fill(0));
  const count = (left: number, right: number): number => {
    if (left > right) return 1;
    if (memo[left][right]) return memo[left][right];
    for (let i = left; i <= right; i++) {
      const leftRes = count(left, i - 1);
      const rightRes = count(i + 1, right);
      res += leftRes * rightRes;
    }
    memo[left][right] = res;
    return res;
  };
  count(1, num);
};

// 不同的二叉搜索树
// 题意：列出所有二叉搜索树的组合可能的树

const generateTree = (num: number) => {
  const res: TreeNode[] = [];
  const build = (left: number, right: number) => {
    if (left > right) {
      res.push(null);
      return res;
    }

    for (let i = left; i <= right; i++) {
      const leftRes = build(left, i - 1);
      const rightRes = build(i + 1, right);
      for (const leftNode of leftRes) {
        for (const rightNode of rightRes) {
          const root = new TreeNode(i);
          root.left = leftNode;
          root.right = rightNode;
          res.push(root);
        }
      }
    }
    return res;
  };
  build(1, n);
};
