// 48. 旋转图像
// 解题方式 二维数组 旋转
// matrix[row][col]  水平轴翻转 matrix[n−row−1][col]
// matrix[row][col] 主对角线翻转 matrix[col][row]

/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
  const n = matrix.length;
  for (let i = 0; i < n / 2; i++) {
    for (let j = 0; j < n; j++) {
      const temp = matrix[i][j];
      matrix[i][j] = matrix[n - i - 1][j];
      matrix[n - i - 1][j] = temp;
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      const temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }
}
