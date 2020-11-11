/**
 * @description 链表（递归）
 */


class NodeR<E> {
  e: E;
  next: NodeR<E>;
  constructor(e: E, next: NodeR<E>) {
    this.e = e;
    this.next = next;
  }
  toString(): string {
    return this.e.toString()
  }
}

class Pair<K, V>{
  private key: K
  private value: V
  constructor(key: K, value: V) {
    this.key = key
    this.value = value
  }
  getKey(): K {
    return this.key
  }
  getValue(): V {
    return this.value
  }
}

class LinkedListR<E> {
  private head: NodeR<E>
  private size: number
  constructor() {
    this.head = null
    this.size = 0
  }
  getSize(): number {
    return this.size
  }
  isEmpty(): boolean {
    return this.size === 0
  }
  private validIndex(index: number, msg: string) {
    if (index < 0 || index > this.size)
      throw new Error(`${msg} failed. Illegal index.`)
  }

  // add
  add(index: number, e: E): void {
    this.validIndex(index, 'Add')
    this.head = this.addSelf(this.head, index, e)
    this.size++
  }
  private addSelf(node: NodeR<E>, index: number, e: E): NodeR<E> {
    if (index == 0)
      return new NodeR(e, node)
    node.next = this.addSelf(node.next, index - 1, e)
    return node
  }
  addFirst(e: E): void {
    this.add(0, e)
  }
  addLast(e: E): void {
    this.add(this.size, e)
  }

  // get
  get(index: number): E {
    this.validIndex(index, 'Get')
    return this.getSelf(this.head, index)
  }
  private getSelf(node: NodeR<E>, index: number): E {
    if (index === 0)
      return node.e
    return this.getSelf(node.next, index - 1)
  }
  getFirst(): E {
    return this.get(0)
  }
  getLast(): E {
    return this.get(this.size - 1)
  }

  // set
  set(index: number, e: E): void {
    this.validIndex(index, "Set")
    this.setSelf(this.head, index, e)
  }
  private setSelf(node: NodeR<E>, index: number, e: E) {
    if (index === 0) {
      node.e = e
      return
    }
    this.setSelf(node.next, index - 1, e)
  }

  // contains
  contains(e: E): boolean {
    return this.containsSelf(this.head, e)
  }
  private containsSelf(node: NodeR<E>, e: E): boolean {
    if (node === null)
      return false;
    if (node.e === e)
      return true
    return this.containsSelf(node.next, e)
  }

  // remove
  remove(index: number): E {
    this.validIndex(index, 'Remove')
    const res: Pair<NodeR<E>, E> = this.removeSelf(this.head, index)
    this.head = res.getKey()
    this.size--
    return res.getValue()
  }
  private removeSelf(node: NodeR<E>, index: number): Pair<NodeR<E>, E> {
    if (index === 0) {
      return new Pair<NodeR<E>, E>(node.next, node.e)
    }
    const res = this.removeSelf(node.next, index - 1)
    node.next = res.getKey()
    return new Pair<NodeR<E>, E>(node, res.getValue())
  }
  removeFirst(): E {
    return this.remove(0)
  }
  removeLast(): E {
    return this.remove(this.size - 1)
  }
  // removeElement
  removeElement(e: E): void {
    this.head = this.removeElementSelf(this.head, e)
  }
  private removeElementSelf(node: NodeR<E>, e: E): NodeR<E> {
    if (node === null) {
      return null
    }
    // 递归之前的属于结束整个递归
    node.next = this.removeElementSelf(node.next, e)
    // 递归之后返回上一轮递归
    if (node.e === e) {
      this.size--
      return node.next
    }
    return node
  }
  toString(): string {
    let res = ''
    let cur: NodeR<E> = this.head;
    while (cur != null) {
      res += `${cur} ->`
      cur = cur.next
    }
    res += "NULL"
    return res;
  }
}

export { LinkedListR, NodeR }

