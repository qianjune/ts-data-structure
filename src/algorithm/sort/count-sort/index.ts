/**
 * @description 计数排序法
 * leetCode 75
 */

class Solution {
  public sortColor(nums: number[]) {
    const cnt: number[] = Array.from({ length: 3 });
    for (let i = 0; i < nums.length; i++) {
      const color = nums[i];
      cnt[color] === undefined
        ? (cnt[color] = 0)
        : (cnt[color] = cnt[color] + 1);
    }
    for (let i = 0; i < cnt[0]; i++) {
      nums[i] = 0;
    }
    for (let i = cnt[0]; i < cnt[0] + cnt[1]; i++) {
      nums[i] = 1;
    }
    for (let i = cnt[0] + cnt[1]; i < nums.length; i++) {
      nums[i] = 2;
    }
    return nums;
  }
}

export { Solution };
