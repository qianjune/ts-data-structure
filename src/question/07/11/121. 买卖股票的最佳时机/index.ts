// 121. 买卖股票的最佳时机
// 解题方式：动态规划

function maxProfit(prices: number[]): number {
  let min = prices[0];
  prices[0] = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < min) {
      min = prices[i];
    }
    prices[i] = Math.max(prices[i - 1], prices[i] - min, 0);
  }
  return prices.pop();
}
