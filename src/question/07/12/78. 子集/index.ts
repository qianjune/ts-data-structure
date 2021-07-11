// 78. 子集
// 解题方式：回朔法

function _dfs(nums: number[], begin: number, path: number[], res: number[][]) {
  if (begin > nums.length) {
    return;
  }
  res.push([...path]);
  for (let i = begin; i < nums.length; i++) {
    path.push(nums[i]);
    _dfs(nums, i + 1, path, res);
    path.pop();
  }
}
function subsets(nums: number[]): number[][] {
  const res: number[][] = [];
  const path: number[] = [];
  _dfs(nums, 0, path, res);
  return res;
}
