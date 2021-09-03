/**
 * @description 最大堆
 * 时间复杂度都是log(n)
 * h代表层数
 * -----------heapify---------------
 * 最多节点数：1+2+4+8+...+2的h-1次方 = 1(1-2的h-1次方)/(1-2) 等价于 2的h次方-1
 * 非叶子节点最多 2的h-1次方-1
 * heapify的算法复杂度为n，最后一层节点就为n/2，最后一层不参与heapify，heapfiy是从非叶子节点里找 n/2*0
 * 倒数第二层节点数n/4，至多交换一次 n/4*1
 */

import JArray from "@root/experiment/algorithm/Array";

class MaxHeap<E> {
  private data: JArray<E>;
  constructor(capacity?: number) {
    this.data = new JArray<E>(capacity ?? null);
  }
  public size(): number {
    return this.data.getSize();
  }
  public isEmpty(): boolean {
    return this.data.isEmpty();
  }

  private parent(index: number): number {
    if (index === 0) {
      throw new Error("index = 0 has no parent node, it is root node");
    }
    return Math.floor((index - 1) / 2);
  }
  private leftChild(index: number): number {
    return index * 2 + 1;
  }
  private rightChild(index: number): number {
    return index * 2 + 2;
  }
  public add(e: E): void {
    this.data.addLast(e);
    this.siftUp(this.data.getSize() - 1);
  }
  private siftUp(index: number): void {
    let curIndex = index;
    const e = this.data.get(curIndex);
    while (curIndex !== 0 && this.data.get(this.parent(curIndex)) < e) {
      this.data.swap(this.parent(curIndex), curIndex);
      curIndex = this.parent(curIndex);
    }
  }
  public findMax(): E {
    if (this.data.getSize() === 0) {
      throw new Error("can not findMax when the heap is empty");
    }
    return this.data.get(0);
  }
  public extractMax(): E {
    const maxElement = this.findMax();
    this.data.swap(0, this.data.getSize() - 1);
    this.data.removeLast();
    this.siftDown(0);
    return maxElement;
  }
  public swap(i: number, j: number): void {
    this.data.swap(i, j);
  }
  private compareWithChild(index: number, size?: number): number {
    const leftChildIndex = this.leftChild(index);
    const rightChildIndex = this.rightChild(index);

    const biggerChildIndex =
      (this.data.get(leftChildIndex) ?? 0) >
      ((rightChildIndex <= size && this.data.get(rightChildIndex)) ?? 0)
        ? leftChildIndex
        : rightChildIndex;
    if (this.data.get(biggerChildIndex) > this.data.get(index)) {
      return biggerChildIndex;
    }
    return null;
  }

  public siftDown(index: number, size = this.data.getSize() - 1): void {
    let curIndex = index;
    while (this.leftChild(curIndex) <= size) {
      // console.log(
      //   `swapIndex: ${this.leftChild(
      //     curIndex
      //   )}, curIndex: ${curIndex}, size: ${size}`
      // );
      const swapIndex = this.compareWithChild(curIndex, size);
      // console.log(`swapIndex: ${swapIndex}`);
      if (swapIndex === null) {
        break;
      }
      this.data.swap(swapIndex, curIndex);
      curIndex = swapIndex;
    }
  }

  public replace(e: E): E {
    const ret = this.findMax();
    this.data.set(0, e);
    this.siftDown(0);
    return ret;
  }
  /**
   * 把一个数组整理成最大堆
   * 时间复杂度n
   * 如果一次单个添加元素复杂度是nlog(n)
   */
  public heapify(arr: E[]): void {
    this.data = new JArray<E>();
    this.data.from(arr);
    console.log(this.data.getSize());
    for (let i = this.parent(this.data.getSize() - 1); i >= 0; i--) {
      console.log(`i: ${i}`);
      this.siftDown(i);
    }
  }
  public toString(): string {
    return this.data.toString();
  }
}
const myMaxHeap = new MaxHeap<number>();
myMaxHeap.add(62);
myMaxHeap.add(41);
myMaxHeap.add(30);
myMaxHeap.add(28);
myMaxHeap.add(16);
myMaxHeap.add(22);
myMaxHeap.add(13);
myMaxHeap.add(19);
myMaxHeap.add(17);
myMaxHeap.add(15);
myMaxHeap.add(52);
// myMaxHeap.extractMax();
// console.log(myMaxHeap.toString());

// myMaxHeap.heapify([13, 15, 17, 19, 22, 28, 30, 41, 52, 62]);
myMaxHeap.heapify([17, 22, 28, 19, 15, 13, 30]);

console.log(`heapify: ${myMaxHeap.toString()}`);

export { MaxHeap };
