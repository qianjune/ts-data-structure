// 剑指 Offer 53 - I. 在排序数组中查找数字 I
// 解题方式：哈希 / 映射

function search(nums: number[], target: number): number {
  const map = new Map();
  for (const num of nums) {
    if (map.has(num)) {
      map.set(num, map.get(num) + 1);
    } else {
      map.set(num, 1);
    }
  }
  return map.has(target) ? map.get(target) : 0;
}
