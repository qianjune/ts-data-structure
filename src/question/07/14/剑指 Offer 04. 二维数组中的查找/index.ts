// 剑指 Offer 04. 二维数组中的查找
// 解题方式：逆时针旋转45度，成为一个类二叉树,二叉树里查找值
function findNumberIn2DArray(matrix: number[][], target: number): boolean {
  if (matrix.length === 0) return false;
  let i = 0,
    j = matrix[0].length - 1;
  while (i < matrix.length && j >= 0) {
    if (target < matrix[i][j]) {
      j--;
    } else if (target > matrix[i][j]) {
      i++;
    } else {
      return true;
    }
  }
  return false;
}
