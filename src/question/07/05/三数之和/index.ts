// 解题方法：排序 + 双指针

// 算法流程：
// 特判，对于数组长度 nn，如果数组为 nullnull 或者数组长度小于 33，返回[][]。
// 对数组进行排序。
// 遍历排序后数组：
// 若 nums[i] > 0：因为已经排序好，所以后面不可能有三个数加和等于 0，直接返回结果。
// 对于重复元素：跳过，避免出现重复解
// 令左指针 L = i + 1L = i + 1，右指针 R = n - 1R = n−1，当 L < RL < R 时，执行循环：
// 当 nums[i] + nums[L] + nums[R] == 0nums[i] + nums[L] + nums[R] == 0，执行循环，判断左界和右界是否和下一位置重复，去除重复解。并同时将 L, RL, R 移到下一位置，寻找新的解
// 若和大于 00，说明 nums[R]nums[R] 太大，RR 左移
// 若和小于 00，说明 nums[L]nums[L] 太小，LL 右移

function threeSum(nums: number[]): number[][] {
  if (nums.length < 3) return [];
  nums.sort((num1, num2) => num1 - num2);
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1;
    let r = nums.length - 1;
    while (l < r) {
      const sum = nums[l] + nums[r] + nums[i];
      if (sum === 0) {
        res.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[r] === nums[r - 1]) {
          r--;
        }
        while (l < r && nums[l] === nums[l + 1]) {
          l++;
        }
        l++;
        r--;
      } else if (sum > 0) {
        r--;
      } else {
        l++;
      }
    }
  }
  return res;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4]));
export { threeSum };
