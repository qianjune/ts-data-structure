// 剑指 Offer 46. 把数字翻译成字符串 同 爬楼梯 同 跳格子
// 解题方式：动态规划
function translateNum(num: number): number {
  let a = 1,
    b = 1;
  const numStr = num.toString();
  for (let i = 2; i <= numStr.length; i++) {
    const temp = numStr.slice(i - 2, i);
    const c = parseInt(temp) >= 10 && parseInt(temp) <= 25 ? a + b : b;
    a = b;
    b = c;
  }
  return b;
}
