/**
 * @description
 * bruteFore: 暴力搜索
 * 最差情况：s*t
 */

class SubstringMatch {
  /**
   * 暴力匹配
   * 时间复杂度n*m
   * 在特殊情况下会退化特别慢
   * @param source
   * @param target
   * @returns
   */
  public static bruteFore(source: string, target: string): number {
    if (source.length < target.length) return -1;
    for (let i = 0; i < source.length - target.length - 1; i++) {
      let j = 0;
      for (; j < target.length; j++) {
        if (source[i + j] !== target[j]) {
          break;
        }
      }
      if (j === target.length) {
        return i;
      }
    }
    return -1;
  }
  /**
   * leetCode 1147
   */
  public static hashMatch() {}
}

console.log(SubstringMatch.bruteFore("hello everyone i am liuyubobobo", "bo"));

export { SubstringMatch };
