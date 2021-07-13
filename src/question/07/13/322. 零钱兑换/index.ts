// 322. 零钱兑换 同 279.完全平方树
// 解题方式：动态规划

// F(3)=min(F(3−c1),F(3−c2),F(3−c3))+1
// =min(F(3−1),F(3−2),F(3−3))+1
// =min(F(2),F(1),F(0))+1
// =min(1,1,0)+1
// =1
function coinChange(coins: number[], amount: number): number {
  const dp = Array(amount + 1).fill(amount + 1);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (i >= coins[j]) {
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
      }
    }
  }
  return dp[amount] > amount ? -1 : dp[amount];
}
