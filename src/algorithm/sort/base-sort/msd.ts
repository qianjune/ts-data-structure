/**
 * @description
 * 时间复杂度W * n （W是最长的string长度）
 * 当遇到空值大量递归会提前结束，所有性能会稍微好
 */
class MSDSort {
  public static sort(arr: string[]): string[] {
    const temp = Array(arr.length);
    return this._sort(arr, 0, arr.length - 1, 0, temp);
  }
  // 根据r位置的字符，处理arr[left,right]
  private static _sort(
    arr: string[],
    left: number,
    right: number,
    r: number,
    temp: string[]
  ) {
    if (left >= right) return;
    const R = 256; // 所有字符的值+1
    // 要多增加一种空的可能
    // 第0位留给了空
    const cnt = Array(R + 1).fill(0);
    const index = Array(R + 2).fill(0);
    for (let i = left; i <= right; i++) {
      // 空位处理
      cnt[arr[i] === undefined ? 0 : arr[i].charCodeAt(r) + 1]++;
    }
    for (let i = 0; i < R + 1; i++) {
      index[i + 1] = index[i] + cnt[i];
    }
    for (let i = left; i <= right; i++) {
      const s = arr[i];
      const code = s === undefined ? 0 : s.charCodeAt(r) + 1;
      temp[left + index[code]] = s;
      index[code]++;
    }
    for (let i = left; i <= right; i++) {
      arr[i] = temp[i];
    }
    // 递归过程
    for (let i = 0; i < R; i++) {
      this._sort(arr, left + index[i], left + index[i + 1] - 1, r + 1, temp);
    }
    return arr;
  }
}

console.log(MSDSort.sort(["BCA", "CBAA", "AC", "BADFE", "ABC", "CBA"]));

export { MSDSort };
