// 215. 数组中的第K个最大元素
// 解题方式：暴力 / 快速排序 / 优先队列 / 二分
function findKthLargest(nums: number[], k: number): number {
  nums.sort((a, b) => b - a);
  return nums[k - 1];
}
