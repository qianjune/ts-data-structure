/**
 * @description 高频题 - 最长回文字串
 */

const palindrome = (s: string, i: number, j: number): string => {
  if (i >= 0 && j < s.length && s[i] === s[j]) {
    i--;
    j++;
  }
  return s.substring(i + 1, j);
};
const longestPalindrome = (s: string) => {
  let res = "";
  for (let i = 0; i < s.length; i++) {
    const w1 = palindrome(s, i, i);
    const w2 = palindrome(s, i, i + 1);
    res = res.length > w1.length ? res : w1;
    res = res.length > w2.length ? res : w2;
  }
  return res;
};
