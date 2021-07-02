/**
 * @description 暴力搜索
 * 最差情况：s*t
 */

class ForceSearch {
  public static search(source: string, target: string): number {
    if (source.length < target.length) throw new Error("");
    let p = -1;
    let firstMatchSuccess = false;
    for (let i = 0; i < source.length - target.length - 1; i++) {
      if (firstMatchSuccess) break;
      let I = i;
      for (let j = 0; j < target.length; j++) {
        if (source[I] != target[j]) {
          p = -1;
          break;
        }
        if (j === 0) {
          p = i;
        }
        if (j === target.length - 1) {
          firstMatchSuccess = true;
        }
        I++;
      }
    }
    return p;
  }
}

console.log(ForceSearch.search("hello everyone i am liuyubobobo", "bo"));

export { ForceSearch };
