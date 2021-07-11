// 17. 电话号码的字母组合
// 解题方式： 回朔法
const map = new Map<string, string[]>();
map.set("2", ["a", "b", "c"]);
map.set("3", ["d", "e", "f"]);
map.set("4", ["g", "h", "i"]);
map.set("5", ["j", "k", "l"]);
map.set("6", ["m", "n", "o"]);
map.set("7", ["p", "q", "r", "s"]);
map.set("8", ["t", "u", "v"]);
map.set("9", ["w", "x", "y", "z"]);
function letterCombinations(digits: string): string[] {
  if (digits.length === 0) return [];
  const res: string[] = [];
  const combination: string[] = [];
  function dfs(x: number) {
    if (x === digits.length) {
      res.push(combination.join(""));
    } else {
      const digit = digits.charAt(x);
      const letters = map.get(digit);
      const lettersLen = letters.length;
      for (let i = 0; i < lettersLen; i++) {
        combination.push(letters[i]);
        const delIndex = combination.length;
        dfs(x + 1);
        combination.splice(delIndex - 1, 1);
      }
    }
  }
  dfs(0);
  return res;
}
