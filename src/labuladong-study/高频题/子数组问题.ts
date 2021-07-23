// 前缀和技巧：解决子数组问题
// https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484488&idx=1&sn=848f76e86fce722e70e265d0c6f84dc3&scene=21#wechat_redirect
const validSumNum = (nums: number[], target: number) => {
  const sumArr = [0];
  let res = 0;
  for (let i = 1; i < nums.length; i++) {
    sumArr[i] = sumArr[i - 1] + nums[i];
  }
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (sumArr[i + 1] - sumArr[j] === target) {
        res++;
      }
    }
  }
  return res;
};
