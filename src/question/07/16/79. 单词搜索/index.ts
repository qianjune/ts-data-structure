// 79. 单词搜索
// 解题方式: 回朔算法 = 深度优先遍历 + 状态重置
function exist(board: string[][], word: string): boolean {
  // 移动的方向
  const directions = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];
  const rows = board.length;
  const columns = board[0].length;
  const visited = Array(rows)
    .fill(null)
    .map(() => Array(columns).fill(false));

  const len = word.length;
  const wordArr = word.split("");

  /**
   * 查看是否超出边界
   * @param x
   * @param y
   * @returns
   */
  function inArea(x: number, y: number): boolean {
    return x >= 0 && x < rows && y >= 0 && y < columns;
  }
  function dfs(x: number, y: number, begin: number) {
    if (begin === len - 1) {
      return board[x][y] === wordArr[begin];
    }
    if (board[x][y] === wordArr[begin]) {
      visited[x][y] = true;
      for (const direction of directions) {
        const nextX = x + direction[0];
        const nextY = y + direction[1];
        if (inArea(nextX, nextY) && !visited[nextX][nextY]) {
          if (dfs(nextX, nextY, begin + 1)) {
            return true;
          }
        }
      }
      visited[x][y] = false;
    }
    return false;
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (dfs(i, j, 0)) {
        return true;
      }
    }
  }
  return false;
}
