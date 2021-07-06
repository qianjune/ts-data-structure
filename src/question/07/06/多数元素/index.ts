/**
 * 多数元素
 * 解题方式： 映射表
 * 优化：映射同时打擂台
 */

function majorityElement(nums: number[]): number {
  if (nums.length === 1) return nums[0];
  const map = new Map();
  let ret = null;
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    if (map.has(n)) {
      if (map.get(n) + 1 > nums.length / 2) {
        ret = n;
        break;
      }
      map.set(n, map.get(n) + 1);
    } else {
      map.set(n, 1);
    }
  }
  return ret;
}
console.log(majorityElement([3, 2, 3]));
export { majorityElement };
