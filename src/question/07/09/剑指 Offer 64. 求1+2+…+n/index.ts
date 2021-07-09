// 剑指 Offer 64. 求1+2+…+n
// 解题方式 逻辑符 短路

let sum = 0;
function sumNums(n: number): number {
  const x = (n > 1 && sumNums(n - 1) > 0) || resetSum();
  sum += n;
  return sum;
}
function resetSum() {
  sum = 0;
  return false;
}
