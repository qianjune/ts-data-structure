// 剑指 Offer 56 - I. 数组中数字出现的次数
// 解题方式：异或计算
function singleNumbers(nums: number[]): number[] {
  let x = 0;
  for (const num of nums) {
    x ^= num; // 相同数字会抵消
  }
  let div = 1;
  while ((div & x) === 0) {
    // 获得首个1个位置
    div <<= 1;
  }
  let a = 0,
    b = 0;
  for (const num of nums) {
    if ((div & num) !== 0) {
      a ^= num;
    } else {
      b ^= num;
    }
  }
  return [a, b];
}
