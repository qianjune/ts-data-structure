/**
 * @description 工具包
 */

class JUtil {
  public static swap<E>(arr: E[], i: number, j: number) {
    const store = arr[j];
    arr[j] = arr[i];
    arr[i] = store;
  }
}

export default JUtil;
