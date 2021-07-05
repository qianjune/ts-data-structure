// 盛最多水的容器
// 解题方法：双指针

function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let max = Math.min(height[left], height[right]) * (right - left);
  while (left < right) {
    if (height[left] <= height[right]) {
      left++;
    } else {
      right--;
    }
    const area = Math.min(height[left], height[right]) * (right - left);
    max = Math.max(max, area);
  }
  return max;
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));

export { maxArea };
