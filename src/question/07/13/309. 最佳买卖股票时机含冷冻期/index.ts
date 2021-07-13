// 309. 最佳买卖股票时机含冷冻期
// 解题方式：动态规划

function maxProfit(prices: number[]): number {
  const len = prices.length;
  if (len <= 1) return 0;
  const dp: number[][] = Array(prices.length);
  for (let i = 0; i < len; i++) {
    if (!dp[i]) dp[i] = [];
    for (let j = 0; j < 3; j++) {
      dp[i][j] = 0;
    }
  }

  dp[0][0] = 0; // 不持股当天没卖出
  dp[0][1] = -prices[0]; // 买入
  dp[0][2] = 0; // 不持股当天卖出
  for (let i = 1; i < len; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][2]);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
    dp[i][2] = dp[i - 1][1] + prices[i];
  }
  console.log(dp);
  return Math.max(dp[len - 1][0], dp[len - 1][2]);
}

maxProfit([1, 2, 3, 0, 2]);
export { maxProfit };
