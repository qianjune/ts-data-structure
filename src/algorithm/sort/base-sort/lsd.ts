/**
 * @description LSD字符串排序法
 * n足够大，W足够小，性能才能比较好
 */

class LSDSort {
  // W 代表等长的长度
  public sort(arr: string[], W?: number): string[] {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].length !== W) {
        throw new Error("All string length must be same");
      }
    }
    const R = 256; // 所有字符的值+1
    const cnt = Array(R).fill(0);
    const index = Array(R + 1).fill(0);
    const temp = Array(arr.length);
    // 从末位开始，对每一位进行计数排序
    // 时间复杂度：W * (n + R) => n
    for (let r = W - 1; r >= 0; r--) {
      arr.forEach((s) => {
        cnt[s.charCodeAt(r)]++;
      });
      for (let i = 0; i < R; i++) {
        index[i + 1] = index[i] + cnt[i];
      }
      arr.forEach((s) => {
        temp[index[s.charCodeAt(r)]] = s;
        index[s.charCodeAt(r)]++;
      });
      arr = [...temp];
    }
    return arr;
  }
}

export { LSDSort };
