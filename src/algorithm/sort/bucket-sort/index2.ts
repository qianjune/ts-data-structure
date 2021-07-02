/**
 * @description
 * 限定桶内元素数量c，用n2的排序也很快
 * 桶内用链表保存
 * 百万级别MSD版略快，千万级别这种就快很多，因为没有很多递归
 * 复杂度n，n越大，常数影响越小
 * leetCode 164
 */

import { LinkedList } from "@src/data-structure/linkedList";
import { BubbleSort } from "../bubble-sort";

class BucketSort2 {
  public sort(arr: number[], c: number): number[] {
    // if(c<1)
    const B = Math.ceil(arr.length / c);
    const temp: LinkedList<number>[] = Array(B).fill(new LinkedList());
    const sortedArr = arr.sort(); // 要用循环比较，这个算法就是一种sort的实现
    const maxV = sortedArr[arr.length - 1];
    const minV = sortedArr[0];
    const d = Math.ceil((maxV - minV + 1) / B);
    for (let i = 0; i < arr.length; i++) {
      // 空位处理
      temp[Math.floor((arr[i] - minV) / d)].add(arr[i]);
    }
    for (let i = 0; i < B; i++) {
      // 没有实现对链表的排序
      // const sortedBucket = BubbleSort.sort3<LinkedList<number>>(temp[i]);
    }
  }
  private _sort(
    arr: number[],
    left: number,
    right: number,
    B: number,
    temp: number[]
  ) {
    if (left >= right) return;
    const sortedArr = arr.sort(); // 要用循环比较，这个算法就是一种sort的实现
    const maxV = sortedArr[arr.length - 1];
    const minV = sortedArr[0];
    if (maxV === minV) return;
    const d = Math.ceil((maxV - minV + 1) / B);
    const cnt = Array(B);
    const index = Array(B + 1).fill(0);
    for (let i = left; i <= right; i++) {
      // 空位处理
      cnt[Math.floor((arr[i] - minV) / d)]++;
    }
    for (let i = 0; i < B; i++) {
      index[i + 1] = index[i] + cnt[i];
    }
    for (let i = left; i <= right; i++) {
      const s = arr[i];
      const p = Math.floor((arr[i] - minV) / d);
      temp[left + index[p]] = s;
      index[p]++;
    }
    for (let i = left; i <= right; i++) {
      arr[i] = temp[i];
    }
    this._sort(arr, left, left + index[0] - 1, B, temp);
    // 递归过程
    for (let i = 0; i < B; i++) {
      this._sort(arr, left + index[i], left + index[i + 1] - 1, B, temp);
    }
  }
}
