/**
 * @description 冒牌排序
 */

import JUtil from "@src/util";

class BubbleSort<E> {
  public static sort<E>(arr: E[]): void {
    for (let i = 0; i < arr.length - 1; i++) {
      // arr[n-i，n)已排好
      for (let j = 0; j < arr.length - 1 - i; i++) {
        if (arr[j] > arr[j + 1]) {
          JUtil.swap(arr, j, j + 1);
        }
      }
    }
  }
  /**
   * 有序数组的情况是O(n)
   * @param arr
   */
  public static sort2<E>(arr: E[]): void {
    for (let i = 0; i < arr.length - 1; i++) {
      // arr[n-i，n)已排好
      let isSwapped = false;
      for (let j = 0; j < arr.length - 1 - i; i++) {
        if (arr[j] > arr[j + 1]) {
          JUtil.swap(arr, j, j + 1);
          isSwapped = true;
        }
      }
      if (!isSwapped) break;
    }
  }

  public static sort3<E>(arr: E[]): void {
    for (let i = 0; i < arr.length - 1;) {
      // arr[n-i，n)已排好
      let lastSwappedIndex = 0;
      for (let j = 0; j < arr.length - 1 - i; i++) {
        if (arr[j] > arr[j + 1]) {
          JUtil.swap(arr, j, j + 1);
          lastSwappedIndex = j + 1;
        }
      }
      // if (lastSwappedIndex === 0) break;
      i = arr.length - lastSwappedIndex;
    }
  }
}

export { BubbleSort };
