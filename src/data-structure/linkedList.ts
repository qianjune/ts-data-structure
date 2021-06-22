/**
 * @description 链表
 * 优点：真正的动态，不需要处理容量问题
 * 缺点：失去了随机访问的能力，不像数组直接用下标访问（时间复杂度O(1)）
 * 时间复杂度：头部O(1),尾部O(n)
 */

export class Node<E> {
  public e: E;
  public next: Node<E>;
  constructor(e?: E, next?: Node<E>) {
    this.e = e ?? null;
    this.next = next ?? null;
  }
  toString(): string {
    return this.e.toString();
  }
}

class LinkedList<E> {
  private dummyHead: Node<E>;
  private size: number;
  constructor() {
    this.dummyHead = new Node(null);
    this.size = 0;
  }
  /**
   * 判断index是否有效
   * @param index
   */
  private judgeIndexValid(index: number) {
    if (index > this.size || index < 0) {
      throw new Error("get failed! illegal index");
    }
  }
  public add(e: E, index = this.size): void {
    console.log(index);
    this.judgeIndexValid(index);
    // if (index === 0) {
    //   this.addFirst(e);
    //   return;
    // }
    let counter = 0;
    let prev = this.dummyHead;
    while (counter < index) {
      prev = prev.next;
      counter++;
    }
    prev.next = new Node(e, prev.next);
    this.size++;
  }
  public addLast(e: E): void {
    this.add(e, this.size);
  }
  public addFirst(e: E): void {
    // const node = new Node(e, this.head);
    // this.head = node;
    // this.dummyHead = new Node(e, this.dummyHead);
    // this.size++;
    this.add(e, 0);
  }
  public getSize(): number {
    return this.size;
  }
  public isEmpty(): boolean {
    return this.size === 0;
  }
  public get(index: number): E {
    const cur = this.getNode(index);
    return cur.e;
  }
  public toString(): string {
    let prev = this.dummyHead;
    let str = `${prev.e}`;
    while (prev.next) {
      prev = prev.next;
      str = str + `->${prev.e}`;
    }
    console.log(str);
    return "";
  }
  /**
   * 获取索引对应的Node
   * @param index
   * @returns
   */
  private getNode(index: number): Node<E> {
    this.judgeIndexValid(index);
    let cur = this.dummyHead.next;
    for (let i = 0; i < index; i++) {
      cur = cur.next;
    }
    return cur;
  }
  public getFirst(): E {
    return this.get(0);
  }
  public getLast(): E {
    return this.get(this.size);
  }
  public set(e: E, index: number): void {
    this.getNode(index).e = e;
  }
  public contains(e: E): boolean {
    let cur = this.dummyHead.next;
    let isContains = false;
    while (cur.next != null && !isContains) {
      if (cur.e === e) {
        isContains = true;
      }
      cur = cur.next;
    }
    return isContains;
  }
  public remove(index: number): E {
    this.judgeIndexValid(index);
    let prev = this.dummyHead;
    for (let i = 0; i < index; i++) {
      prev = prev.next;
    }
    const delNode = prev.next;
    prev.next = delNode.next;
    delNode.next = null;
    this.size--;
    return delNode.e;
  }
  public removeFirst(): E {
    return this.remove(0);
  }
  public removeLast(): E {
    return this.remove(this.size);
  }
}
const myLinkedList = new LinkedList();
myLinkedList.add(1);
myLinkedList.add(2);
myLinkedList.add(3);
myLinkedList.add(2.5, 2);
myLinkedList.toString();
console.log(`cur:${myLinkedList.get(0)}`);
console.log(`cur:${myLinkedList.contains(4)}`);
console.log(`cur:${myLinkedList.remove(1)}`);
myLinkedList.toString();
console.log(`cur:${myLinkedList.contains(1)}`);

export { LinkedList };
