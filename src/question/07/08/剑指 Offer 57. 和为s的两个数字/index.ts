// 剑指 Offer 57. 和为s的两个数字
// 解题方式：撞双指针

function twoSum(nums: number[], target: number): number[] {
  // 先二分找到小于等于target的index，然后循环
  let l = 0;
  let r = nums.length - 1;
  let sum = null;
  while (l < r) {
    sum = nums[l] + nums[r];
    if (sum > target) r--;
    else if (sum < target) l++;
    else {
      break;
    }
  }
  return [nums[l], nums[r]];
}
