// 剑指 Offer 10- I. 斐波那契数列 （同爬楼梯）
// 解题方式：动态规划

function fib(n: number): number {
  let a = 0,
    b = 1,
    sum = null;
  for (let i = 0; i < n; i++) {
    sum = (a + b) % (1e9 + 7);
    a = b;
    b = sum;
  }
  return a;
}
