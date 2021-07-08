// 剑指 Offer 61. 扑克牌中的顺子
// 解题方式：循环 + 比较
function isStraight(nums: number[]): boolean {
  nums.sort((a, b) => a - b);
  let joker = 0;
  for (let i = 0; i < 4; i++) {
    if (nums[i] === 0) {
      joker++;
    } else if (nums[i] === nums[i + 1]) {
      return false;
    }
  }
  console.log(nums);
  return nums[4] - nums[joker] < 5;
}
