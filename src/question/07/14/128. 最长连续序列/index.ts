// 128. 最长连续序列
// 解题方式：哈希
function longestConsecutive(nums: number[]): number {
  const set = new Set<number>();
  for (let i = 0; i < nums.length; i++) {
    set.add(nums[i]);
  }
  let res = 0;
  for (const num of set) {
    let max = 1;
    let cur = num;
    if (!set.has(cur - 1)) {
      while (set.has(cur + 1)) {
        max++;
        cur = cur + 1;
      }
      if (max > res) res = max;
    }
  }
  return res;
}
