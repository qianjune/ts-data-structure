// 75. 颜色分类
// 解题方式： 单指针 / 双指针 / 快速排序

/**
 Do not return anything, modify nums in-place instead.
 */

function _swap(arr: number[], l: number, r: number) {
  const temp = arr[l];
  arr[l] = arr[r];
  arr[r] = temp;
}
function sortColors(nums: number[]): void {
  let pos0 = 0;
  let pos2 = nums.length - 1;
  for (let i = 0; i <= pos2; i++) {
    while (i <= pos2 && nums[i] === 2) {
      _swap(nums, i, pos2);
      --pos2;
    }
    if (nums[i] === 0) {
      _swap(nums, i, pos0);
      ++pos0;
    }
  }
}

function sortColors2(nums: number[]): void {
  const pos0 = 0;
  let pos2 = nums.length - 1;
  while (nums[pos2] === 2) {
    pos2 = pos2 - 1;
  }
  console.log(pos2);
  // for (let i = 0; i <= pos2; i++) {
  //   if (nums[i] === 2) {
  //     _swap(nums, i, pos2);
  //     --pos2;
  //   }
  //   if (nums[i] === 0) {
  //     _swap(nums, i, pos0);
  //     ++pos0;
  //   }
  //   console.log(nums);
  // }
}
sortColors2([0, 2, 2, 2, 0, 2, 1, 1]);
export { sortColors };
