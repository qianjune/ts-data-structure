/**
 * @description 数据结构 - 栈
 */

import ArrayList from "./list";

interface Stack<T> {
  pop(): T;
  push(element: T): void;
  isEmpty(): boolean;
  peek(): T;
  size(): number;
}

class StackList<T> implements Stack<T> {
  private list: ArrayList<T>;
  constructor(originList: T[]) {
    this.list = new ArrayList<T>(originList);
  }
  size(): number {
    return this.list.size;
  }
  pop(): T {
    return this.list.remove(this.list.size - 1);
  }
  push(element: T): void {
    this.list.add(this.size(), element);
  }
  isEmpty(): boolean {
    return this.list.size === 0;
  }
  peek(): T {
    return this.list.get(this.list.size - 1);
  }
}

export default StackList;
