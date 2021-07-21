// 子集 // 组合 // 排列
// https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247485007&idx=1&sn=ceb42ba2f341af34953d158358c61f7c&scene=21#wechat_redirect

const subsets1 = (nums: number[]) => {
  const track: number[] = [];
  const res = [];
  const backTrack1 = (nums: number[], start: number, track: number[]) => {
    res.push(track);
    for (let i = start; i < nums.length; i++) {
      track.push(nums[i]);
      backTrack1(nums, i + 1, track);
      track.pop();
    }
  };
  backTrack1(nums, 0, track);
};
