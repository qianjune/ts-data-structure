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
    throw new Error("Method not implemented.");
  }
  push(element: T): void {
    this.list.add(this.size(), element);
  }
  isEmpty(): boolean {
    return this.list.size === 0;
  }
  peek(): T {
    throw new Error("Method not implemented.");
  }
}

export default StackList;
