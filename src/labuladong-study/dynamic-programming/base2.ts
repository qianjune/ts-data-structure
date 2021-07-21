/**
 * @description
 * 动态规划一般是n的二次方
 * 状态压缩后可以到n
 * base case
 * 备忘录
 */

// 最下下坠路径和
const minFallingPathSum = (matrix: number[][]) => {
  const n = matrix.length;
  const memo: number[][] = Array(n).map((_) => Array(n).fill(66666));
  const dp = (matrix: number[][], i: number, j: number): number => {
    if (i < 0 || j < 0 || i >= matrix.length || j >= matrix[0].length) {
      return 9999999;
    }

    if (i === 0) return matrix[i][j];
    if (memo[i][j] !== 66666) return memo[i][j];
    memo[i][j] =
      matrix[i][j] +
      Math.min(
        dp(matrix, i - 1, j),
        dp(matrix, i - 1, j - 1),
        dp(matrix, i - 1, j + 1)
      );
    return memo[i][j];
  };
  let res = Infinity;
  for (let j = 0; j < n; j++) {
    res = Math.min(res, dp(matrix, n - 1, j));
  }
};
