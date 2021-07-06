/**
 * 找到所有数组中消失的数字
 */

function findDisappearedNumbers(nums: number[]): number[] {
  const ret = Array(nums.length).fill(null);
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    ret[nums[i]] = true;
  }
  for (let i = 1; i <= nums.length; i++) {
    if (!ret[i]) {
      res.push(i);
    }
  }
  return res;
}
console.log(findDisappearedNumbers([1, 1]));
export { findDisappearedNumbers };

// 解题方式： 处理下标位数据做 哈希 表
function findDisappearedNumbers2(nums: number[]): number[] {
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    const n = (nums[i] - 1) % nums.length;
    nums[n] += nums.length;
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] <= nums.length) {
      res.push(i + 1);
    }
  }
  return res;
}
