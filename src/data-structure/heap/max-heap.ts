/**
 * @description 最大堆
 * 时间复杂度都是log(n)
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
  private findMax(): E {
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
  private compareWithChild(index: number): number {
    const leftChildIndex = this.leftChild(index);
    const rightChildIndex = this.rightChild(index);
    const biggerChildIndex =
      this.data.get(leftChildIndex) > this.data.get(rightChildIndex)
        ? leftChildIndex
        : rightChildIndex;
    if (this.data.get(biggerChildIndex) > this.data.get(index)) {
      return biggerChildIndex;
    }
    return null;
  }
  private siftDown(index: number) {
    let curIndex = index;
    while (this.leftChild(curIndex) < this.data.getSize() - 1) {
      const swapIndex = this.compareWithChild(curIndex);
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
   */
  public heapify(): void { }
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
myMaxHeap.extractMax();
console.log(myMaxHeap.toString());
export { MaxHeap };
