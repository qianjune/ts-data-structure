/**
 * @description 动态规划基础
 * https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484731&idx=1&sn=f1db6dee2c8e70c42240aead9fd224e6&scene=21#wechat_redirect
 */

/**
 * 斐波那契额数列
 * 两种（自顶而下/自底而上）
 * @param n
 * @returns
 */

const fib1 = (n: number): number => {
  const memo: number[] = [];
  const helper = (n: number) => {
    if (n === 1 || n === 2) return 1;
    if (memo[n]) return memo[n];
    memo[n] = helper(n - 1) + helper(n - 2);
    return memo[n];
  };
  return helper(n);
};
// 状态转移方程
// f(n) = {
//   1,n=1,2
//   f(n-1)+f(n-2),n>2
// }
const fib2 = (n: number) => {
  const dp = [1, 1];
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]; // 优化 可以不用dp数组，就用两个变量
  }
  return dp[n];
};

/**
 * 凑零钱问题
 */
// 要符合「最优子结构」，子问题间必须互相独立

// 先确定「状态」，也就是原问题和子问题中变化的变量。由于硬币数量无限，所以唯一的状态就是目标金额amount。
// 然后确定dp函数的定义：函数 dp(n)表示，当前的目标金额是n，至少需要dp(n)个硬币凑出该金额。
// 然后确定「选择」并择优，也就是对于每个状态，可以做出什么选择改变当前状态。具体到这个问题，无论当的目标金额是多少，选择就是从面额列表coins中选择一个硬币，然后目标金额就会减少：
const coinChange1 = () => { };
