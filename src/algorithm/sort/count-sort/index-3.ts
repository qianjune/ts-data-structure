/**
 * @description 计数排序法
 *  * leetCode 75
 * 需要空间 R
 * 适合数据范围小的
 * 如果有数据偏移：数字的可能范围是[L,R]
 * cnt = Array.from({length:R-L+1})
 * cnt[num-L]++
 */

class Solution {
  public sortColor(nums: number[]): number[] {
    // 处理元素取之[0,R)的计数排序
    const R = 3;
    const cnt: number[] = Array.from({ length: R });
    for (let i = 0; i < nums.length; i++) {
      const color = nums[i];
      cnt[color] === undefined
        ? (cnt[color] = 0)
        : (cnt[color] = cnt[color] + 1);
    }
    const index = Array(R + 1).fill(0); // 每段范围的index
    for (let i = 0; i < R; i++) {
      index[i + 1] = index[i] + cnt[i];
    }
    for (let i = 0; i + 1 < index.length; i++) {
      // [index[i],index[i+1])的值为i
      for (let j = index[i]; j < index[i + 1]; j++) {
        nums[j] = i;
      }
    }

    return nums;
  }
}

export { Solution };
