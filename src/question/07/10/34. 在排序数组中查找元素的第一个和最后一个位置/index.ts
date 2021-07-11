// 34. 在排序数组中查找元素的第一个和最后一个位置
// 解题方式：二分搜索法

function searchRange(nums: number[], target: number): number[] {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    console.log(`left:${left},right:${right}`);
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] > target) right = mid - 1;
    else if (nums[mid] < target) left = mid + 1;
    else {
      console.log(left, right, mid);
      let l = mid;
      let r = mid;
      while (nums[l] === target) {
        l--;
      }
      while (nums[r] === target) {
        r++;
      }
      return [l + 1, r - 1];
    }
  }
  return [-1, -1];
}
