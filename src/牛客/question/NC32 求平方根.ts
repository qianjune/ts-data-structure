/**
 * @description NC32 求平方根
 */
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * @param x int整型
 * @return int整型
 */
export function sqrt(x: number): number {
  // write code here
  let left = 0;
  let right = x;
  while (true) {
    const mid = left + ((right - left) >> 1);
    if (mid > x / mid) {
      right = mid - 1;
    } else {
      if (mid + 1 > x / (mid + 1)) {
        return mid;
      } else {
        left = mid + 1;
      }
    }
  }
}
