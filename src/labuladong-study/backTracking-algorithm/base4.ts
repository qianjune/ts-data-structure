// 数独
// https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247485097&idx=1&sn=a5e82da8646cd8985de6b2b0950de4e2&scene=21#wechat_redirect

// 括号生成 n个括号
// 转换为2n的位置去放括号

const generateParentheses = (n: number) => {
  const backTrack = (
    left: number,
    right: number,
    track: string[],
    res: string[]
  ) => {
    // 若左括号剩下的多，说明不合法
    if (left > right) return;
    if (left < 0 || right < 0) return;
    if (left === 0 && right === 0) {
      res.push(track.join(""));
      return;
    }
    track.push("(");
    backTrack(left - 1, right, track, res);
    track.pop();

    track.push(")");
    backTrack(left, right - 1, track, res);
    track.pop();
  };
  const track: string[] = [];
  const res: string[] = [];
  backTrack(n, n, track, res);
};
