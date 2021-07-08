// 剑指 Offer 11. 旋转数组的最小数字
// 解题方式：循环 / 有序数组 - 二分搜索法

function minArray(numbers: number[]): number {
  let ret = null;
  for (const num of numbers) {
    if (ret === null || ret > num) {
      ret = num;
    }
  }
  return ret;
}

function minArray(numbers: number[]): number {
  let i = 0;
  let j = numbers.length - 1;
  let mid = null;
  while (i < j) {
    mid = i + Math.floor((j - i) / 2);
    if (numbers[mid] > numbers[j]) i = mid + 1;
    else j--;
  }
  return numbers[i];
}
