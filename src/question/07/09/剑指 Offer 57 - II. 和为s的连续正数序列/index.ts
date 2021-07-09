// 剑指 Offer 57 - II. 和为s的连续正数序列
// 解题方式：滑动窗口 双指针

function findContinuousSequence(target: number): number[][] {
  const n = Math.ceil(target / 2);
  const res = [];
  const list = [];
  for (let i = 1; i <= n; i++) {
    list[i - 1] = i;
  }
  for (let i = 1; i <= n; i++) {
    let sum = i;
    let j = i + 1;
    while (sum < target) {
      sum += j++;
      if (sum === target) {
        console.log(i, j);
        res.push(list.slice(i - 1, j - 1));
      } else if (sum > target) {
        break;
      }
    }
  }
  return res;
}
