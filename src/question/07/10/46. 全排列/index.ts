// 46. 全排列 同 // 剑指 Offer 38. 字符串的排列
// 解题方式：回朔法

function permute(nums: number[]): number[][] {
  const res: number[][] = [];
  const arr: number[] = [...nums];
  function _swap(l: number, r: number) {
    const temp = arr[l];
    arr[l] = arr[r];
    arr[r] = temp;
  }
  function dfs(x: number) {
    if (x === arr.length - 1) {
      console.log(arr);
      res.push([...arr]);
      return;
    }
    const set = new Set();
    for (let i = x; i < arr.length; i++) {
      if (set.has(arr[i])) continue;
      set.add(arr[i]);
      _swap(i, x);
      dfs(x + 1);
      _swap(i, x);
    }
  }
  dfs(0);
  console.log(res);
  return res;
}
permute([1, 2, 3]);
export { permute };
