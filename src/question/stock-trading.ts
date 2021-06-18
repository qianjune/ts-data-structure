/**
 * @description 股票买卖
 * https://labuladong.gitee.io/algo/1/8/
 */

// n：总共n天
// i：第i天
// k：当天最大交易次数
// 交易状态：0/没有股票，可买入 1/有股票，可卖出
const n = 5;
const k = 3;
const dp = [[[]]];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < k; j++) {
    [0, 1].forEach((status) => { });
  }
}
