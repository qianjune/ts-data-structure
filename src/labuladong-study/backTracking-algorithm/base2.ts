// 子集划分
// 虽然回溯算法就是暴力穷举，但穷举也分聪明的穷举方式和低效的穷举方式，关键看你以谁的「视角」进行穷举。
// 通俗来说，我们应该尽量「少量多次」，就是说宁可多做几次选择，也不要给太大的选择空间；宁可「二选一」选k次，也不要 「k选一」选一次。

// nums 能否 平均 放到 k个桶里，并且每个桶里的和相同
const backTrack = (
  k: number, // 桶数
  bucket: number, // 当前桶装的量
  nums: number[],
  start: number, // 要用的数字的起始位置
  used: boolean[], // 是否使用过的记录
  target: number // 目标数
): boolean => {
  if (k === 0) {
    return true;
  }
  if (bucket === target) {
    return backTrack(k - 1, 0, nums, 0, used, target);
  }
  for (let i = start; i < nums.length; i++) {
    if (used[i]) continue;
    if (bucket + nums[i] > target) {
      continue;
    }
    // 加入
    bucket += nums[i];
    used[i] = true;
    if (backTrack(k, bucket, nums, i + 1, used, target)) {
      return true;
    }
    // 删除
    bucket += nums[i];
    used[i] = false;
  }
  return false;
};
const canPartitionKSubsets = (nums: number[], k: number): boolean => {
  let sum = 0;
  nums.forEach((num) => {
    sum += num;
  });
  const target = sum / k;
  const uesed = Array(k).fill(false);
  return backTrack(k, 0, nums, 0, uesed, target);
};
