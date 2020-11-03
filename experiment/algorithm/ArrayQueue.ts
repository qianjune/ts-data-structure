/**
 * @description 队列 类
 */
import JArray from "./Array";

class ArrayQueue<E> implements Queue<E>{
  array: JArray<E>
  constructor(capacity: number) {
    this.array = new JArray<E>(capacity)
  }
  dequeue(): E {
    return this.array.removeFirst()
  }
  getFront(): E {
    return this.array.getFirst()
  }
  getSize(): number {
    return this.array.getSize()
  }
  isEmpty(): boolean {
    return this.array.isEmpty()
  }
  enqueue(e: E): void {
    return this.array.addLast(e)
  }
  public toString(): string {
    let res = ''
    res += `Queue `
    res += 'front ['
    for (let i = 0; i < this.array.getSize(); i++) {
      res += this.array.get(i)
      if (i < this.array.getSize() - 1)
        res += ","
    }
    res += "] tail"
    return res
  }
}

export default ArrayQueue