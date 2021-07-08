// 剑指 Offer 03. 数组中重复的数字
// 解题方式：哈希

function findRepeatNumber(nums: number[]): number {
  const set = new Set();
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    if (set.has(n)) {
      return n;
    } else {
      set.add(n);
    }
  }
}
