/**
 * @description 回朔算法
 * DFS
 */
// 解决一个回溯问题，实际上就是一个决策树的遍历过程
// 1、路径：也就是已经做出的选择。
// 2、选择列表：也就是你当前可以做的选择。
// 3、结束条件：也就是到达决策树底层，无法再做选择的条件。

// const res = [];
// const backTrack = (路径, 选择列表) => {
//   if (满足条件) {
//     res.push(路径);
//     return;
//   }
//   for (const 选择 of 选择列表) {
//     # 做选择
//     将该选择从选择列表移除
//     路径.add(选择)
//     backtrack(路径, 选择列表)
//     # 撤销选择
//     路径.remove(选择)
//     将该选择再加入选择列表
//   }
// };

// 全排列
const allSort = (nums: number[]) => {
  const res: number[][] = [];
  const track: number[] = [];
  const backTrack = (nums: number[], track: number[]) => {
    if (nums.length === track.length) {
      res.push(track);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (track.findIndex((v) => v === nums[i]) > -1) continue;
      track.push(nums[i]);
      backTrack(nums, track);
      track.pop();
    }
  };
  backTrack(nums, track);
  return res;
};

// n皇后问题
const nQueue = (n: number) => {
  const res = [];
  const board: string[][] = Array(8)
    .fill(".")
    .map((_) => Array(8).fill("."));
  const isValid = (board: string[][], row: number, column: number): boolean => {
    // 检查列
    const n = board.length;
    for (let i = 0; i < n; i++) {
      if (board[i][row] === "&") return false;
    }
    // 检查左上
    // 检查右上
  };
  const backTrack = (board: string[][], row: number) => {
    if (row === board.length) {
      res.push(board);
      return;
    }
    for (let i = 0; i < board[n].length; i++) {
      if (!isValid(board, n, i)) continue;
      board[n][i] = "&";
      backTrack(board, row + 1);
      board[n][i] = ".";
    }
  };
  backTrack(board, 0);
};
