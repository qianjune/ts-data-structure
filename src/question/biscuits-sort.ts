/**
 * @description 烧饼排序
 * https://github.com/labuladong/fucking-algorithm/blob/master/%E7%AE%97%E6%B3%95%E6%80%9D%E7%BB%B4%E7%B3%BB%E5%88%97/%E7%83%A7%E9%A5%BC%E6%8E%92%E5%BA%8F.md
 */

class BiscuitsSort {
  public static sort(arr: number[] = [3, 2, 4, 1]): number[] {
    let cloneArr = [...arr];
    for (let i = arr.length; 1 < i; i--) {
      cloneArr = this._findMaxIndex(cloneArr, 0, i);
    }

    return [];
  }
  // private static _sort(arr: number[]) { }
  private static _findMaxIndex(arr: number[], l: number, r: number) {
    const sliceArr = arr.slice(l, r);
    let maxElementIndex = 0;
    for (let i = 0; i < sliceArr.length; i++) {
      if (sliceArr[maxElementIndex] < sliceArr[i]) {
        maxElementIndex = i;
      }
    }
    console.log(maxElementIndex);
    const newArr = this._reverseTwice(arr, l, r, maxElementIndex);
    console.log(newArr);
    return newArr;
  }
  private static _reverseTwice(
    arr: number[],
    l: number,
    r: number,
    maxIndex: number
  ) {
    const sliceArr = arr.slice(l, maxIndex + 1);
    const reverseArr = [...sliceArr.reverse(), ...arr.slice(maxIndex + 1, r)];
    return reverseArr.reverse();
  }
}

export { BiscuitsSort };
