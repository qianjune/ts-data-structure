/**
 * @description NC82 滑动窗口的最大值
 */

/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * @param num int整型一维数组
 * @param size int整型
 * @return int整型一维数组
 */
const searchMax = (arr: number[], l: number, r: number) => {
  let max = -Infinity;
  let maxIndex = -1;
  for (let i = l; i < r; i++) {
    if (arr[i] > max) {
      max = arr[i];
      maxIndex = i;
    }
  }

  return maxIndex;
};
export function maxInWindows(num: number[], size: number): number[] {
  if (size === 0) return [];
  // write code here
  if (num.length < size) return [];
  const res = [];
  let maxIndex = -1;
  for (let i = 0; i <= num.length - size; i++) {
    console.log(i, maxIndex);
    if (i <= maxIndex) {
      maxIndex = searchMax(num, maxIndex, i + size);
    } else {
      maxIndex = searchMax(num, i, i + size);
    }

    res.push(num[maxIndex]);
  }
  return res;
}

maxInWindows([2, 3, 4, 2], 3);
