/**
 * @description Set
 * 不能添加重复元素
 * 适合用于统计
 */

import { BTS2 } from "@src/algorithm/binary-search-tree/index2";

export interface Set<E> {
  add(e: E): void;
  remove(e: E): void;
  contains(e: E): boolean;
  getSize(): number;
  isEmpty(): boolean;
}

class BSTSet<E> implements Set<E> {
  private bst: BTS2<E>;
  constructor() {
    this.bst = new BTS2<E>();
  }
  add(e: E): void {
    this.bst.add(e);
  }
  remove(e: E): void {
    throw new Error("Method not implemented.");
  }
  contains(e: E): boolean {
    throw new Error("Method not implemented.");
  }
  isEmpty(): boolean {
    return this.bst.getSize() === 0;
  }

  getSize(): number {
    return this.bst.getSize();
  }
}

export { BSTSet };
