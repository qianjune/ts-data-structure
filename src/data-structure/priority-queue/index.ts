import { MaxHeap } from "../tree/heap/max-heap";
import { Queue } from "../interface/Queue";

/**
 * @description 优先队列
 * 入队正常，出队根据自身优先级，动态处理
 * 如：任务管理器-各个任务分配资源
 * 游戏ai攻击优先级
 * 普通线性结构（入1出n） / 顺序线性结构（入n出1）/ 堆（出log(n)入log(n)）
 */
class ProiorityQueue<E> implements Queue<E> {
  private queue: MaxHeap<E>;
  constructor() {
    this.queue = new MaxHeap<E>();
  }
  dequeue(): E {
    return this.queue.extractMax();
  }
  getFront(): E {
    return this.queue.findMax();
  }
  getSize(): number {
    return this.queue.size();
  }
  isEmpty(): boolean {
    return this.queue.isEmpty();
  }
  enqueue(e: E): void {
    this.queue.add(e);
  }
}

export { ProiorityQueue };
