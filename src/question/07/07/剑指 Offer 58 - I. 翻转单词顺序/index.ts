// 剑指 Offer 58 - I. 翻转单词顺序
// 解题方式： 双指针 / 字符串处理

function reverseWords(s: string): string {
  return s.trim().split(/\s+/).reverse().join(" ");
}
