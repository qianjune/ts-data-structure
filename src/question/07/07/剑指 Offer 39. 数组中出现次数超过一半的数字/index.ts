// 解题方式：哈希
function majorityElement(nums: number[]): number {
  if (nums.length === 1) return nums[0];
  const map = new Map();
  // const res = null;
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    // console.log(n, map.get(n));
    if (map.has(n)) {
      const ret = map.get(n);
      if (ret + 1 > nums.length / 2) {
        return n;
      }
      map.set(n, ret + 1);
      // console.log(n, ret);
    } else {
      map.set(n, 1);
    }
  }
  // return res;
  return null;
}

export { majorityElement };
