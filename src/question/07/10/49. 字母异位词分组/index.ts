// 49. 字母异位词分组
// 解题方式： 字符串处理 + 哈希

function groupAnagrams(strs: string[]): string[][] {
  const map = new Map();
  const res: string[][] = [];
  for (let i = 0; i < strs.length; i++) {
    const str = strs[i];
    const code = str.split("").sort().join("");
    if (map.has(code)) {
      const arr = map.get(code);
      arr.push(str);
      map.set(code, arr);
    } else {
      map.set(code, [str]);
    }
  }

  return Array.from(map.values());
}
