// 300. 最长递增子序列
// 解题方式： 动态规划 + 二分法
function lengthOfLIS(nums: number[]): number {
  let res = 0;
  const tail: number[] = [];
  for (const num of nums) {
    let i = 0;
    let j = res;
    while (i < j) {
      // 二分的目的是找到连续子序列的数该替换的位置
      const m = Math.floor((i + j) / 2);
      if (tail[m] < num) i = m + 1;
      j = m;
    }
    tail[i] = num;
    if (res === j) res++;
  }
  return res;
}
