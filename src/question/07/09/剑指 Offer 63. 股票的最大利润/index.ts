// 剑指 Offer 63. 股票的最大利润
// 解题方式：动态规划
// dp[i] = max(dp[i-1],price[i]-min(price[0,i))
function maxProfit(prices: number[]): number {
  if (prices.length === 0) return 0;
  let min = prices[0];
  prices[0] = 0;
  for (let i = 1; i < prices.length; i++) {
    // 获得当前之前最低的价格
    if (min === -1 || min > prices[i]) {
      min = prices[i];
    }
    prices[i] = Math.max(prices[i - 1], prices[i] - min, 0);
  }
  return prices[prices.length - 1];
}
