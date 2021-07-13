// 347. 前 K 个高频元素
// 解题方式：排序 ， 哈希 ， 个数作为下标

function topKFrequent(nums: number[], k: number): number[] {
  const map = new Map();
  let res: number[] = [];
  for (const num of nums) {
    if (map.has(num)) {
      map.set(num, map.get(num) + 1);
    } else {
      map.set(num, 1);
    }
  }
  res = Array.from(map.keys()).sort((a, b) => map.get(b) - map.get(a));
  return res.slice(0, k);
}

console.log(topKFrequent([1, 2], 2));
export { topKFrequent };
