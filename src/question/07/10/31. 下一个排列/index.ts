// 31. 下一个排列
// 解题方式： 两遍扫描 - 从后往前找
/**
 Do not return anything, modify nums in-place instead.
 */

function _swap(arr: number[], l: number, r: number) {
  const temp = arr[l];
  arr[l] = arr[r];
  arr[r] = temp;
}
function _reverse(arr: number[], start: number) {
  let left = start,
    right = arr.length - 1;
  while (arr[left] > arr[right] && left < right) {
    _swap(arr, left, right);
    left++;
    right--;
  }
}
function nextPermutation(nums: number[]): void {
  let i = nums.length - 2;
  let j = nums.length - 1;
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--;
  }

  if (i >= 0) {
    while (j > 0 && nums[i] >= nums[j]) {
      j--;
    }
  }
  console.log(i, j);
  if (i > -1 && j >= 0) _swap(nums, i, j);
  i >= 0 ? _reverse(nums, i + 1) : nums.reverse();
}
