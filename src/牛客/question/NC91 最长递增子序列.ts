/**
 * NC91 最长递增子序列
 */

/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 * retrun the longest increasing subsequence
 * @param arr int整型一维数组 the array
 * @return int整型一维数组
 */
export function LIS(arr: number[]): number[] {
  // write code here
  const res: number[] = [];
  const maxLenArr = [];
  if (arr.length < 1) return res;
  res.push(arr[0]);
  maxLenArr.push(1);
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > res[res.length - 1]) {
      res.push(arr[i]);
      maxLenArr.push(res.length);
    } else {
      const pos = res.findIndex((v) => v >= arr[i]);
      console.log(arr[i], pos);
      res[pos] = arr[i];
      maxLenArr.push(pos + 1);
    }
  }
  console.log(res, maxLenArr);
  for (let i = arr.length - 1, j = res.length; j > 0; --i) {
    console.log(`i: ${i},j: ${j}`);
    if (maxLenArr[i] === j) {
      console.log(`i: ${i},j: ${j} ---`);

      res[--j] = arr[i];
    }
  }
  return res;
  return [];
}

LIS([2, 1, 5, 3, 6, 4, 8, 9, 7]);
