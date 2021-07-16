// 560. 和为K的子数组
// 解题方式：前缀 + 哈希
function subarraySum(nums: number[], k: number): number {
  const map = new Map();
  map.set(0, 1); // 前缀重点
  let res = 0,
    pre = 0;
  for (const num of nums) {
    pre += num;
    if (map.has(pre - k)) {
      res += map.get(pre - k);
    }
    if (map.has(pre)) {
      map.set(pre, map.get(pre) + 1);
    } else {
      map.set(pre, 1);
    }
  }
  return res;
}
