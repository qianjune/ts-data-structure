// 22. 括号生成
// 解题方式：回朔算法，dfs深度优先遍历

// 当前左右括号都有大于 0 个可以使用的时候，才产生分支；
// 产生左分支的时候，只看当前是否还有左括号可以使用；
// 产生右分支的时候，还受到左分支的限制，右边剩余可以使用的括号数量一定得在严格大于左边剩余的数量的时候，才可以产生分支；
// 在左边和右边剩余的括号数都等于 0 的时候结算。

function _dfs(curStr: string, left: number, right: number, res: string[]) {
  if (left === 0 && right === 0) {
    res.push(curStr);
    return;
  }
  if (left > right) {
    return;
  }
  if (left > 0) {
    _dfs(curStr + "(", left - 1, right, res);
  }
  if (right > 0) {
    _dfs(curStr + ")", left, right - 1, res);
  }
}
function generateParenthesis(n: number): string[] {
  const res: string[] = [];
  if (n === 0) return res;
  _dfs("", n, n, res);
  return res;
}
