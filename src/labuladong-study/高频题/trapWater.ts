/**
 * @description 接雨水问题
 */

// 一组数如何排列可以构成一个沟壑，接住最多量的雨水

// 暴力解法
const trapWater1 = (height: nunber[]) => { };
// 带备忘录 的 暴力解法
const trapWater2 = (height: number[]) => { };
// 双指针
const trapWater3 = (height: number[]) => {
  const len = height.length;
  let left = 0;
  let right = len - 1;
  let res = 0;
  let lMax = height[left];
  let rMax = height[right];
  while (left <= right) {
    lMax = Math.max(lMax, height[left]);
    rMax = Math.max(rMax, height[right]);
    if (lMax < rMax) {
      res += lMax - height[left];
      left++;
    } else {
      res += rMax - height[right];
      right--;
    }
  }
  return res;
};
