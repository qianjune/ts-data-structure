// 39.组合总和
// 解题方式：回朔法
function _dfs(
  candidates: number[],
  begin: number,
  target: number,
  path: number[],
  res: number[][]
) {
  if (target < 0) {
    return;
  }
  if (target === 0) {
    res.push([...path]);
    return;
  }
  for (let j = begin; j < candidates.length; j++) {
    path.push(candidates[j]);
    _dfs(candidates, j, target - candidates[j], path, res);
    path.pop();
  }
}
function combinationSum(candidates: number[], target: number): number[][] {
  const res: number[][] = [];
  const path: number[] = [];
  _dfs(candidates, 0, target, path, res);
  return res;
}
