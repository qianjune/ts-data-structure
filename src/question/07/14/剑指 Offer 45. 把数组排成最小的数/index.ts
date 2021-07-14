// 剑指 Offer 45. 把数组排成最小的数
// 解题方式： 自定义 排序
function minNumber(nums: number[]): string {
  nums.sort((a, b) => {
    const aStr = a.toString();
    const bStr = b.toString();
    return parseInt(aStr + bStr) - parseInt(bStr + aStr);
  });
  console.log(nums);
  return nums.join("");
}
