/**
 * @description 实现 计算器
 * https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484903&idx=1&sn=184beaad36a71c9a8dd93c41a8ba74ac&scene=21#wechat_redirect
 */

const convertStrToNumber = (numStr: string) => {
  let res = 0;
  for (let i = 0; i < numStr.length; i++) {
    res += 10 * res + parseInt(numStr.charAt(i));
  }
};

const caculate = () => {
  // 栈
  // 加减 推入栈出栈
  // 乘除 栈顶计算
};

const bracket = () => {
  // 括号用递归处理
  // 每次处理括号中
};
