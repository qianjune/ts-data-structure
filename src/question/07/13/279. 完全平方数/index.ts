// 279. 完全平方数 同 322. 零钱兑换
// 解题方式：动态规划
function numSquares(n: number): number {
  const res = Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    res[i] = i;
    for (let j = 1; i - j * j >= 0; j++) {
      res[i] = Math.min(res[i], res[i - j * j] + 1); // +1 代表 加n个1的一种
      console.log(res);
    }
  }
  return res[n];
}

numSquares(2);
export { numSquares };
