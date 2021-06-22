/**
 * @description 链表
 * 优点：真正的动态，不需要处理容量问题
 * 缺点：失去了随机访问的能力，不像数组直接用下标访问（时间复杂度O(1)）
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
    this.judgeIndexValid(index);
    let cur = this.dummyHead.next;
    for (let i = 0; i < index; i++) {
      cur = cur.next;
    }
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

  public getFirst() { }
  public getLast() { }
  public set(e: E, index: number) { }
  public contains(e: E): boolean {
    return false;
  }
  public() {
    const prev = this.dummyHead;
    let delNode;
    prev.next = delNode.next;
    delNode = null;
  }
}

export { LinkedList };
