class MaxHeap<E> {
  private data: E[];
  constructor() {
    this.data = [];
  }

  private parent(index: number) {
    return Math.floor((index - 1) / 2);
  }

  /**
   * 取得左孩子的index
   * @param index
   * @returns
   */
  private leftChild(index: number): number {
    return index * 2 + 1;
  }
  private rightChild(index: number): number {
    return index * 2 + 2;
  }
  private compareWithChild(index: number, size?: number): number {
    const leftChildIndex = this.leftChild(index);
    const rightChildIndex = this.rightChild(index);

    const biggerChildIndex =
      (this.data[leftChildIndex] ?? 0) >
      ((rightChildIndex <= size && this.data[rightChildIndex]) ?? 0)
        ? leftChildIndex
        : rightChildIndex;
    if (this.data[biggerChildIndex] > this.data[index]) {
      return biggerChildIndex;
    }
    return null;
  }

  public siftDown(index: number, size = this.data.length - 1) {
    let curIndex = index;
    while (this.leftChild(curIndex) <= size) {
      const swapIndex = this.compareWithChild(curIndex, size);
      if (swapIndex === null) {
        break;
      }
      const ret = this.data[swapIndex];
      this.data[swapIndex] = this.data[curIndex];
      this.data[curIndex] = ret;
      curIndex = swapIndex;
    }
  }
  public findMax(): E {
    return this.data[0];
  }
  public extractMax(): E {
    const maxElement = this.findMax();
    const ret = this.data[0];
    this.data[0] = this.data[this.data.length - 1];
    this.data[this.data.length - 1] = ret;
    this.data.pop();
    this.siftDown(0);
    return maxElement;
  }
  public heapify(arr: E[]) {
    this.data = [...arr];
    for (let i = this.parent(this.data.length - 1); i >= 0; i--) {
      this.siftDown(i);
    }
  }
}

// 找到最后一个叶子结点，和它的父节点做比较；依次处理钱一个节点，知道，根节点也处理完毕。
