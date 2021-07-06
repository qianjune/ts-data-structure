// 移动零
// 解题方式：双指针

/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
  const n = nums.length;
  let l = 0,
    r = 0;
  while (r < n) {
    if (nums[r] !== 0) {
      swap(nums, l, r);
      l++;
    }
    r++;
  }
}
function swap(arr: number[], i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
