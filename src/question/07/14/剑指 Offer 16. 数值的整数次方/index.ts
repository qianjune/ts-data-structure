// 剑指 Offer 16. 数值的整数次方
// 解题方式：循环 / 二进制二分法 / 幂运算
// n
function myPow(x: number, n: number): number {
  if (x === 0) return 0;
  let res = 1.0;
  let b = n;
  if (n < 0) {
    x = 1 / x;
    b = -b;
  }
  console.log(b);
  while (b > 0) {
    console.log(b & 1);
    if ((b & 1) === 1) res *= x;
    console.log(res);
    x *= x;
    b >>= 1;
    console.log(b);
  }
  return res;
}
function myPow(x: number, n: number): number {
  return x ** n;
}

function myPow(x: number, n: number): number {
  let res = 1;
  if (n < 0) {
    n = -n;
    x = 1 / x;
  }
  for (let i = 0; i < n; i++) {
    res *= x;
  }
  return res;
}
myPow(2.0, -2147483648);
export { myPow };
