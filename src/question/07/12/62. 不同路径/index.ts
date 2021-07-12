// 62. 不同路径
// 动态规划

function uniquePaths(m: number, n: number): number {
  const res: number[][] = [];
  for (let i = 0; i < m; i++) {
    if (!res[i]) res[i] = [];
    res[i][0] = 1;
  }
  for (let i = 0; i < n; i++) {
    res[0][i] = 1;
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      res[i][j] = res[i - 1][j] + res[i][j - 1];
    }
  }
  return res[m - 1][n - 1];
}
console.log(uniquePaths(3, 7));
export { uniquePaths };
