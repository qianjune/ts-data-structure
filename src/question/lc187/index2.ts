/**
 * @description leetCode 1392
 * preHash
 * postHash
 * 两个数组做预先处理
 * 时间复杂度n
 */

class Solution187Two {
  private static MOD = 1e9 + 7;
  public static main(s: string): string[] {
    if (s.length < 10) return [];
    const map = Array(256);
    map["A".charCodeAt(0)] = 1;
    map["C".charCodeAt(0)] = 2;
    map["G".charCodeAt(0)] = 3;
    map["T".charCodeAt(0)] = 4;
    const seen = new Set();
    const res = new Set();
    let hash = 0;
    const ten9 = 1e9;
    for (let i = 0; i < 9; i++) {
      hash += hash * 10 + map[s[i].charCodeAt(0)];
    }
    for (let i = 9; i < s.length; i++) {
      hash = hash * 10 + map[s[i].charCodeAt(0)];
      if (seen.has(hash)) res.add(s.substring(i - 9, i + 1));
      else seen.add(hash);
      hash -= map[s[i - 9].charCodeAt(0)] * ten9;
    }
  }
}
