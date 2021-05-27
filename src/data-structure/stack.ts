/**
 * @description 数据结构 - 栈
 */

interface Stack<T> {
  pop(): T;
  push(element: T): void;
  isEmpty(): boolean;
  peek(): T;
}

class StackList<T> implements Stack<T> {
  pop(): T {
    throw new Error("Method not implemented.");
  }
  push(element: T): void {
    throw new Error("Method not implemented.");
  }
  isEmpty(): boolean {
    throw new Error("Method not implemented.");
  }
  peek(): T {
    throw new Error("Method not implemented.");
  }
}

export default StackList;
