/**
 * @description 工具包
 */

class JUtil {
  public static isPositionValid(p: number, length: number): void {
    if (p >= length || p < 0) {
      throw new Error("index illegal");
    }
  }
  public static swap<E>(arr: E[], i: number, j: number): void {
    const store = arr[j];
    arr[j] = arr[i];
    arr[i] = store;
  }
  public static arrayToString<E>(arr: E[]): string {
    const size = arr.length;
    const data = arr;
    let res = "";
    res += `Array: size = ${size}, capacity = ${data.length}\n`;
    res += "[";
    for (let i = 0; i < size; i++) {
      res += data[i];
      if (i < size - 1) res += ",";
    }
    res += "]";
    return res;
  }
}

export default JUtil;
