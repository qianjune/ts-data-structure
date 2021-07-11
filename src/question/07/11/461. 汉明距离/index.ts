// 461. 汉明距离
// 解题方式：位运算
function hammingDistance(x: number, y: number): number {
  let s = x ^ y,
    res = 0;
  while (s !== 0) {
    res += s & 1;
    s >>= 1;
  }
  return res;
}
