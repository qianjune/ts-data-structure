/**
 * @description 斗地主
 * leetcode 659
 * https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247491005&idx=1&sn=36cdcb0098aca81c3c4061baf2474b82&scene=21#wechat_redirect
 */

const possible = (nums: []) => {
  const freg = Array(13).fill(0);
  const canConnect = Array(13).fill(0);
  for (const num of nums) {
    freg[num]++;
  }
  for (const num of nums) {
    if (freg[num] === 0) continue;
    if (freg[num] > 0 && freg[num + 1] > 0 && freg[num + 2] > 0) {
      freg[num]--;
      freg[num + 1]--;
      freg[num + 2]--;
      canConnect[num + 3];
    } else if (canConnect[num] > 0) {
      freg[num]--;
      canConnect[num]--;
      canConnect[num + 1]++;
    } else {
      return false;
    }
  }
  return true;
};
