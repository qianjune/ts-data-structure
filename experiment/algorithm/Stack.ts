/**
 * @description Stack 接口
 */
interface Stack<E> {
  push(e: E): void
  pop(): E
  peek(): E
  getSize(): number
  isEmpty(): boolean
}

export default Stack