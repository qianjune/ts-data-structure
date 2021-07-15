// 152. 乘积最大子数组
// 动态规划
// 难点：维护负数/连续的

function maxProduct(nums: number[]): number {
  let max = -Infinity,
    imin = 1,
    imax = 1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < 0) {
      const ret = imax;
      imax = imin;
      imin = ret;
    }
    imax = Math.max(imax * nums[i], nums[i]);
    imin = Math.min(imin * nums[i], nums[i]);
    max = Math.max(max, imax);
  }
  return max;
}
