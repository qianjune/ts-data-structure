// 剑指 Offer 10- II. 青蛙跳台阶问题(同 楼梯 / 斐波那契)
// 解题方式：动态规划
function numWays(n: number): number {
  let p = 1,
    q = 1,
    sum = 0;
  for (let i = 0; i < n; i++) {
    sum = (p + q) % (1e9 + 7);
    p = q;
    q = sum;
  }
  return p;
}
