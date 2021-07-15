// 剑指 Offer 66. 构建乘积数组
// 解题方式：表格区分
function constructArr(a: number[]): number[] {
  const b = [1];
  const temp = 1;
  for (let i = 1; i < a.length; i++) {
    b[i] = b[i - 1] * a[i - 1];
  }
  // for (let i = a.length - 2; i >= 0; i--) {
  //   temp *= a[i + 1];
  //   b[i] *= temp;
  // }
  return b;
}
console.log(constructArr([1, 2, 3, 4, 5]));
export { constructArr };
