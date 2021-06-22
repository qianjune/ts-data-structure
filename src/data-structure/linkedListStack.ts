/**
 * @description 使用链表实现的栈
 */

import Stack from "@root/experiment/algorithm/Stack";
import { LinkedList } from "./linkedList";

class LinkedListStack<E> implements Stack<E> {
  private list: LinkedList<E>;
  constructor() {
    this.list = new LinkedList();
  }
  push(e: E): void {
    this.list.addFirst(e);
  }
  pop(): E {
    return this.list.removeFirst();
  }
  peek(): E {
    return this.list.getFirst();
  }
  getSize(): number {
    return this.list.getSize();
  }
  isEmpty(): boolean {
    return this.list.isEmpty();
  }
}

export { LinkedListStack };
