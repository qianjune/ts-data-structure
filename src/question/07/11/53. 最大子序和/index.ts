// 53. 最大子序和
// 解题方式：动态规划

function maxSubArray(nums: number[]): number {
  let res = nums[0];
  for (let i = 1; i < nums.length; i++) {
    nums[i] = Math.max(nums[i - 1] + nums[i], nums[i]);
    if (nums[i] > res) {
      res = nums[i];
    }
  }
  return res;
}
