/**
 * @description 栈 类
 */
import JArray from "./Array";
import Stack from "./Stack";

class ArrayStack<E> implements Stack<E>{

  array: JArray<E>
  constructor(capacity?: number) {
    this.array = new JArray(capacity)
  }
  push(e: E): void {
    return this.array.addLast(e)
  }
  pop(): E {
    return this.array.removeLast()
  }
  peek(): E {
    return this.array.getLast()
  }
  getSize(): number {
    return this.array.getSize()
  }
  isEmpty(): boolean {
    return this.array.isEmpty()
  }

  public getCapacity(): number {
    return this.array.getCapacity()
  }
  public toString(): string {
    let res = ''
    res += `Stack `
    res += '['
    for (let i = 0; i < this.array.getSize(); i++) {
      res += this.array.get(i)
      if (i < this.array.getSize() - 1)
        res += ","
    }
    res += "] top"
    return res
  }
}

export default ArrayStack