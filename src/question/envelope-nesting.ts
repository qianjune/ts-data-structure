/**
 * @description 信封嵌套问题
 */

class EnvelopeNesting {
  public static nesting(
    arr = [
      [5, 4],
      [6, 4],
      [6, 7],
      [2, 3],
    ]
  ): number[][] {
    arr.sort((a, b) => {
      return a[0] - b[0] || b[1] - a[1];
    });
    console.log(arr);
    const heights = arr.map((a) => {
      return a[1];
    });
    console.log(heights);
    this.lengthOfLIS([3, 4, 7, 5, 8, 6, 9]);
    return [];
  }

  public static lengthOfLIS(arr: number[]) {
    //最长上升子序列
    // 这里不算完全的上述情况
    const dp: number[] = [];
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]);
      if (dp.length === 0) {
        dp.push(arr[i]);
        // return;
      } else if (arr[i] > dp[dp.length - 1]) {
        dp.push(arr[i]);
      } else {
        dp[dp.length - 1] = arr[i];
      }
    }
  }
}

export { EnvelopeNesting };
