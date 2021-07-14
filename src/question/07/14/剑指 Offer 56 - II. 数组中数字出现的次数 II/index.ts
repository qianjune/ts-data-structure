// 剑指 Offer 56 - II. 数组中数字出现的次数 II
// 解题方式：异或运算 + 有限状态机

// 接下来，需要通过 状态转换表 导出 状态转换的计算公式 。首先回忆一下位运算特点，对于任意二进制位 xx ，有：

// 异或运算：x ^ 0 = x​ ， x ^ 1 = ~x
// 与运算：x & 0 = 0 ， x & 1 = x

// 计算 oneone 方法：

// 设当前状态为 twotwo oneone ，此时输入二进制位 nn 。如下图所示，通过对状态表的情况拆分，可推出 oneone 的计算方法为：

// if two == 0:
//   if n == 0:
//     one = one
//   if n == 1:
//     one = ~one
// if two == 1:
//     one = 0
// 引入 异或运算 ，可将以上拆分简化为：

// if two == 0:
//     one = one ^ n
// if two == 1:
//     one = 0
// 引入 与运算 ，可继续简化为：

// one = one ^ n & ~two

function singleNumber(nums: number[]): number {
  let ones = 0,
    twos = 0;
  for (const num of nums) {
    ones = ones ^ (num & ~twos);
    twos = twos ^ (num & ~ones);
  }
  return ones;
}
