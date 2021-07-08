// 解题方式：双指针
function exchange(nums: number[]): number[] {
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    const leftVal = nums[left];
    const rightVal = nums[right];
    if (rightVal % 2 === 0) {
      right--;
    } else if (leftVal % 2 !== 0) {
      left++;
    } else {
      swap(nums, left, right);
      left++;
      right--;
    }
  }
  return nums;
}
function swap(arr: number[], l: number, r: number) {
  const temp = arr[l];
  arr[l] = arr[r];
  arr[r] = temp;
}
