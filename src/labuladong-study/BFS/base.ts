// 作用：从start到target的最小距离
// https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247485134&idx=1&sn=fd345f8a93dc4444bcc65c57bb46fc35&scene=21#wechat_redirect
// 空间复杂度较DFS高
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
