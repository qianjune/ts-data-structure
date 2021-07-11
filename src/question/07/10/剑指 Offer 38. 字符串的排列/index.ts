// 剑指 Offer 38. 字符串的排列  同 46. 全排列
// 解题方式：回朔法

function permutation(s: string): string[] {
  const c = s.split("");
  const res: string[] = [];
  function dfs(x: number) {
    if (x === c.length - 1) {
      res.push(c.join());
      return;
    }
    const set = new Set(); // 判断重复组合 - dfs里称为剪枝
    for (let i = x; i < c.length; i++) {
      if (set.has(c[i])) continue;
      set.add(c[i]);
      _swap(c, i, x);
      dfs(x + 1);
      console.log(c);

      _swap(c, i, x);
    }
  }
  dfs(0);
  return res;
}
function _swap(arr: string[], l: number, r: number) {
  const temp = arr[l];
  arr[l] = arr[r];
  arr[r] = temp;
}

permutation("123");
export { permutation };
