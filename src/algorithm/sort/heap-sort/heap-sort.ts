/**
 * @description 堆排序
 */

import { MaxHeap } from "./max-heap";

class HeapSort<E> {
  public sort(data: E[]) {
    const maxHeap = new MaxHeap<E>();
    data.forEach((d) => {
      maxHeap.add(d);
    });
    for (let i = data.length - 1; i >= 0; i++) {
      data.push(maxHeap.extractMax());
    }
    console.log(data);
  }
  public sort2(data: E[]) {
    if (data.length <= 1) return data;
    const maxHeap = new MaxHeap<E>();
    maxHeap.heapify(data);
    console.log(`${maxHeap.toString()} -- heapify`);
    for (let i = data.length - 1; i > 0; i--) {
      // const i = maxHeap.size() - 1;
      maxHeap.swap(0, i);
      console.log(`${maxHeap.toString()} -- swap`);
      console.log(`siftDown-size: ${i - 1}`);
      maxHeap.siftDown(0, i - 1);
      console.log(`${maxHeap.toString()} -- siftDown`);
    }
    return maxHeap.toString();
  }
}

const heapSort = new HeapSort();
heapSort.sort2([13, 15, 17, 19, 22, 28, 30, 41, 52, 62]);
