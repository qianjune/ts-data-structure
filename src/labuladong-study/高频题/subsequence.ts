/**
 * @description 判读子序列
 */

// s是不是t的字串
const isSubsequence = (s: string, t: string) => {
  let left = 0;
  let right = 0;
  while (right < s.length) {
    if (s[left] === t[right]) left++;
    right++;
  }
  return left === s.length;
};
// s1,s2是不是t的字串
const left_bound = (arr: number[], target: number) => {
  // if (target > arr[arr.length - 1]) return -1;
  let lo = 0,
    hi = arr.length;
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (target > arr[mid]) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return lo;
};
const isSubsequence1 = (s: string, t: string) => {
  const len = t.length;
  const dict: number[][] = [];
  for (let i = 0; i < len; i++) {
    const curCode = t.charCodeAt(i);
    if (!dict[curCode]) {
      dict[curCode] = [];
    }
    dict[curCode].push(i);
  }
  let j = 0;
  for (let i = 0; i < s.length; i++) {
    const curCode = s.charCodeAt(i);
    if (!dict[curCode]) return false;
    const pos = left_bound(dict[curCode], j);
    // 没找到要匹配的字符
    console.log(`pos: ${pos}`);
    if (pos == dict[curCode].length) return false;
    j = dict[curCode][pos] + 1;
  }
  return true;
};

console.log(isSubsequence1("abc", "caedbcd"));
export { isSubsequence1 };
