// 剑指 Offer 49. 丑数
// 解题方式：动态规划 + 三指针

function nthUglyNumber(n: number): number {
  const dp = [1];
  let a = 0,
    b = 0,
    c = 0;
  for (let i = 1; i < n; i++) {
    const n2 = dp[a] * 2,
      n3 = dp[b] * 3,
      n5 = dp[c] * 5;
    dp[i] = Math.min(n2, n3, n5);
    if (dp[i] === n2) a++;
    if (dp[i] === n3) b++;
    if (dp[i] === n5) c++;
  }
  return dp[n - 1];
}
