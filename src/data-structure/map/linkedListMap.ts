/**
 * @description 链表Map
 */

import { LinkedList } from "../linkedList";
import { Map } from ".";

class Node<K, V> {
  public key: K;
  public value: V;
  public next: Node<K, V>;
  constructor(k: K, v?: V, next?: Node<K, V>) {
    this.key = k ?? null;
    this.value = v ?? null;
    this.next = next ?? null;
  }
}

class LinkedListMap<K, V> implements Map<K, V> {
  private dummyHead: Node<K, V>;
  private size: number;
  constructor() {
    this.dummyHead = new Node(null);
    this.size = 0;
  }
  add(k: K, v: V): void {
    let prev = this.dummyHead;
    while (prev.next) {
      prev = prev.next;
    }
    prev.next = new Node(k, v);
    this.size++;
  }
  remove(k: K): void {
    let prev = this.dummyHead;
    for (let i = 0; i < this.size; i++) {
      if (prev.next.key === k) {
        return;
      }
      prev = prev.next;
    }
    const delNode = prev.next;
    prev.next = delNode.next;
    delNode.next = null;
    this.size--;
  }
  contains(k: K): boolean {
    throw new Error("Method not implemented.");
  }
  set(k: K, v: V): void {
    throw new Error("Method not implemented.");
  }
  get(k: K): V {
    throw new Error("Method not implemented.");
  }
  getSize(): number {
    throw new Error("Method not implemented.");
  }
  isEmpty(): boolean {
    throw new Error("Method not implemented.");
  }
  public toString(): string {
    let prev = this.dummyHead;
    let str = `{ key = ${prev.key}, value = ${prev.value} }`;
    while (prev.next) {
      prev = prev.next;
      str = str + ` -> { key = ${prev.key}, value = ${prev.value} }`;
    }
    console.log(str);
    return "";
  }
}
const myLinkedListMap = new LinkedListMap();
myLinkedListMap.add("a", 1);
myLinkedListMap.add("b", 2);
myLinkedListMap.add("c", 3);
console.log(myLinkedListMap.toString());
export { LinkedListMap };
