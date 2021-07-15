// 剑指 Offer 48. 最长不含重复字符的子字符串
// 解题方式：双指针

function lengthOfLongestSubstring(s: string): number {
  let left = 0,
    right = 0;
  let res = 0;
  let ret = "";
  while (right <= s.length) {
    const cur = s.charAt(right);
    const matchIndex = ret.indexOf(cur);
    if (matchIndex >= 0) {
      if (res < ret.length) res = ret.length;
      left = ret.indexOf(cur) + 1;
      ret = ret.substring(left);
    }
    ret += cur;
    right++;
  }
  return res;
}
