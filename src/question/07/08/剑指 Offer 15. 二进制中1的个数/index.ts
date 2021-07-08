// 剑指 Offer 15. 二进制中1的个数
// 解题方式：位运算

/**
 * @param {number} n - a positive integer
 * @return {number}
 */
const hammingWeight = function (n) {
  let ret = 0;
  while (n) {
    ret += n & 1;
    n >>>= 1;
  }
  return ret;
};
