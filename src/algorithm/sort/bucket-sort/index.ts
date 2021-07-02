/**
 * @description 桶排序
 * 可用于数字排序
 * 取值范围R：max-min+1
 * 桶的数量B
 * 每个桶放的数量d: ceil(R/B)
 * 算出每个桶的范围
 * 性质：
 * 不是原地排序的算法
 * 类似MSD 和 二路 ，三路的思维
 */

// 基于MSD的桶排序
class BucketSort {
  public sort(arr: number[], B: number): number[] {
    // if(B<1)
    const temp = Array(arr.length);
    this._sort(arr, 0, arr.length - 1, B, temp);
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
