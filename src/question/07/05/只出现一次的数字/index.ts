// 只出现一次的数字
// 解题方式：异或运算/set
function singleNumber(nums: number[]): number {
  const set = new Set<number>();
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    if (set.has(n)) {
      set.delete(n);
    } else {
      set.add(n);
    }
  }
  console.log(Array.from(set));
  return 0;
}

function singleNumber2(nums: number[]): number {
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    res ^= nums[i];
  }
  console.log(res);
  return res;
}
singleNumber2([2, 2, 1]);
export { singleNumber };
