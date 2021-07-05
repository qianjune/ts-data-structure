/**
 * 无重复字符的最长子串
 */
// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

import { max } from "rxjs/operator/max";

function lengthOfLongestSubstring(s: string): number {
  if (s === "") return 0;
  let ret = "";
  let res = 1;
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      const w = s[j];
      console.log(ret);
      if (ret.indexOf(w) > -1) {
        if (ret.length > res) {
          res = ret.length;
        }
        ret = "";
        break;
      } else {
        ret += w;
      }
    }
  }
  return res;
}

/**
 * 哈希
 * @param s
 * @returns
 */
function lengthOfLongestSubstring2(s: string): number {
  if (s === "") return 0;
  let res = 0;
  const strSet = new Set();
  for (let i = 0, rk = -1; i < s.length; i++) {
    while (rk + 1 < s.length && !strSet.has(s.charAt(rk + 1))) {
      console.log(s[rk]);
      strSet.add(s.charAt(rk + 1));
      console.log(strSet.values());
      rk++;
      res = Math.max(strSet.size, res);
    }
    strSet.delete(s.charAt(i));
  }
  return res;
}
console.log(lengthOfLongestSubstring2("pwwkew"));
export { lengthOfLongestSubstring };
