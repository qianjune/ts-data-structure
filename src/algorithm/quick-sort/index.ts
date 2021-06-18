/**
 * @description 快速排序法
 * 复杂度：n+n/2+n/4+n/8...+1=2n = O(n)
 */

class QuickSort {
  public static sort<E>(arr: E[]) {
    this._sort(arr, 0, arr.length - 1);
    console.log(arr);
  }

  private static _sort<E>(arr: E[], l: number, r: number) {
    if (l >= r) return;
    // if (arr.length <= 1) return
    const p = this.partition(arr, l, r);
    this._sort(arr, l, p - 1);
    this._sort(arr, p + 1, r);
  }
  private static partition<E>(arr: E[], l: number, r: number) {
    let j = l;
    for (let i = l + 1; i <= r; i++) {
      if (arr[l] > arr[i]) {
        j++;
        this.swap(arr, j, i);
      }
      console.log(arr);
    }
    this.swap(arr, j, l);
    return j;
  }
  private static swap<E>(arr: E[], i: number, j: number) {
    const store = arr[j];
    arr[j] = arr[i];
    arr[i] = store;
  }
}

const quickSort = (arr: number[] = [4, 6, 5, 2, 3, 8, 7, 1]): number[] => {
  if (arr.length <= 1) return arr;
  const cloneArr = [...arr];
  const l = 0;
  const r = cloneArr.length;
  let j = l;
  let store;
  const anchor = cloneArr[l];
  for (let i = j + 1; i < r; i++) {
    if (anchor > cloneArr[i]) {
      j++;
      store = cloneArr[i];
      cloneArr[i] = cloneArr[j];
      cloneArr[j] = store;
    }
    console.log(cloneArr);
  }
  store = cloneArr[j];
  cloneArr[j] = cloneArr[l];
  cloneArr[l] = store;
  console.log(cloneArr);
  const leftPart = quickSort(cloneArr.slice(0, j));
  const rightPart = quickSort(cloneArr.slice(j + 1, r));
  const finalArr = [...leftPart, cloneArr[j], ...rightPart];
  console.log(finalArr);
  return finalArr;
};

export { quickSort, QuickSort };
