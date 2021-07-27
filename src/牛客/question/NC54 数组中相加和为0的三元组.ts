/**
 * @description NC54 数组中相加和为0的三元组
 */

/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * @param num int整型一维数组
 * @return int整型二维数组
 */
export function threeSum(num: number[]): number[][] {
  // write code here
  const res = [];
  num.sort((a, b) => a - b);
  if (num[0] > 0) return [];
  for (let i = 0; i < num.length; i++) {
    if (i === 0 || num[i] !== num[i - 1]) {
      let left = i + 1;
      let right = num.length - 1;
      while (left < right) {
        while (left < right && num[i] + num[left] + num[right] > 0) {
          right--;
        }
        if (left < right && num[i] + num[left] + num[right] === 0) {
          const temp = [num[i], num[left], num[right]];
          res.push(temp);
          while (left < right && num[left] === temp[1]) left++;
        } else {
          left++;
        }
      }
    }
  }
  return res;
}
