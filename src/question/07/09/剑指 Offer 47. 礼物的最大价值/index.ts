// 剑指 Offer 47. 礼物的最大价值
// 解题方式：动态规划
// f(i,j) = max(f(i,j-1),f(i-1,j))+grid(i,j)

function maxValue(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  // 初始化第一行
  for (let i = 1; i < m; i++) {
    grid[i][0] += grid[i - 1][0];
  }
  // 初始化第一列
  for (let i = 1; i < n; i++) {
    grid[0][i] += grid[0][i - 1];
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      grid[i][j] += Math.max(grid[i][j - 1], grid[i - 1][j]);
    }
  }
  return grid[m - 1][n - 1];
}
