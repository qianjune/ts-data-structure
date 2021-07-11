// 55. 跳跃游戏
// 阶梯方式： 贪心算法

function canJump(nums: number[]): boolean {
  let cur = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    if (cur >= i && i + nums[i] > cur) {
      cur = i + nums[i];
      if (cur > nums.length) {
        return true;
      }
    }
  }
  return cur >= nums.length - 1;
}
