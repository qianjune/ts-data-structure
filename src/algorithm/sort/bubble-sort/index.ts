/**
 * @description 冒牌排序
 */

import JUtil from "@src/util";

class BubbleSort<E> {
  public sort(arr: E[]): void {
    for (let i = 0; i < arr.length - 1; i++) {
      // arr[n-i，n)已排好
      for (let j = 0; j < arr.length - 1 - i; i++) {
        if (arr[j] > arr[j + 1]) {
          JUtil.swap(arr, j, j + 1);
        }
      }
    }
  }
}

export { BubbleSort };
