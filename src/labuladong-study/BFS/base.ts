// 作用：从start到target的最小距离
// https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247485134&idx=1&sn=fd345f8a93dc4444bcc65c57bb46fc35&scene=21#wechat_redirect

import { TreeNode } from "../public/tree";

// BFS空间复杂度较DFS高
const BFS = (start, target) => {
  const q = [];
  const visited = new Set();
  let step = 0;
  q.push(start);
  visited.add(start);
  while (q.length !== 0) {
    const size = q.length;
    for (let i = 0; i < size; i++) {
      const cur = q.pop();
      if (cur === target) {
        return step;
      }
      // cur的相邻
      for (const x = cur.next; ;) {
        if (x !== target) {
          q.push(x);
          visited.add(q);
        }
      }
    }
    step++;
  }
  return step;
};

const minDepth = (root: TreeNode) => {
  const q: TreeNode[] = [];
  let depth = 0;
  q.push(root);
  while (q.length !== 0) {
    const size = q.length;
    for (let i = 0; i < size; i++) {
      const cur = q.pop();
      if (!cur.left && !cur.right) {
        return depth;
      }
      if (cur.left) q.push(cur.left);
      if (cur.right) q.push(cur.right);
    }
    depth++;
  }
  return depth;
};
// s代码当前密码
// j代表当前转第几个
const plusOne = (s: string, j: number) => {
  const char = s.split(",");
  if (char[n] === "9") {
    char[n] = "0";
  }
  char[n] = String(parseInt(char[n]) + 1);
  return char.join("");
};
const minusOne = (s: string, j: number) => {
  const char = s.split(",");
  if (char[n] === "0") {
    char[n] = "9";
  }
  char[n] = String(parseInt(char[n]) - 1);
  return char.join("");
};

// 解密码
// 双向 q2 ,只有明确target的值的时候才能双向
const openPassword = (deadends, target: string) => {
  const q = [];
  const visited = new Set();
  let step = 0;
  const deadendsSet = new Set(deadends);
  q.push("0000");
  // q2.add(target);
  visited.add("0000");
  while (q.length !== 0) {
    const size = q.length;
    for (let i = 0; i < size; i++) {
      const cur = q.pop();
      if (!deadendsSet.has(cur)) continue;
      if (cur === target) {
        return step;
      }
      // if (q2.contains(cur)) {
      //   return step;
      // }
      visited.add(cur);
      for (let j = 0; j < 4; j++) {
        const up = plusOne(cur, j);
        const down = minusOne(cur, j);
        if (!visited.has(up)) {
          q.push(up);
        }
        if (!visited.has(down)) {
          q.push(down);
        }
      }
    }
    step++;
    // temp 相当于 q1
    // 这里交换 q1 q2，下一轮 while 就是扩散 q2
    // q1 = q2;
    // q2 = temp;
  }
  return -1;
};
