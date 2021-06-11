/**
 * @description 插入排序
 */

import JUtil from "@src/util";

const arr: number[] = [6, 4, 2, 3, 7, 1];

for (let i = 1; i < arr.length; i++) {
  let j = i;
  while (arr[j] < arr[j - 1] && j > 0) {
    JUtil.swap(arr, j, j - 1);
    j--;
  }
}
console.log(arr, "arr...");
