/**
 * @description leetCode 387
 */

class Soulution {
  public firstUniqChar(s: string): number {
    const freg: number[] = Array.from({ length: 26 });
    for (let i = 0; i < s.length; i++) {
      freg[s.charAt(i) - "a"]++;
    }
    for (let i = 0; i < freg.length; i++) {
      if (freg[s.charAt(i) - "a"] === 1) {
        return i;
      }
    }
    return -1;
  }
}
