// 剑指 Offer 42. 连续子数组的最大和
// 解题方式：动态规划 （连续子数组）
function maxSubArray(nums: number[]): number {
  let res = nums[0];
  for (let i = 1; i < nums.length; i++) {
    nums[i] += Math.max(nums[i - 1], 0);
    res = Math.max(res, nums[i]);
  }
  return res;
}
