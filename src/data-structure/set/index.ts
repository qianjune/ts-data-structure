/**
 * @description Set
 * 不能添加重复元素
 * 适合用于统计，分词
 */

import { BTS2 } from "@src/data-structure/tree/binary-search-tree/index2";

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
    if (!this.bst.contains(e)) {
      this.bst.add(e);
    }
  }
  remove(e: E): void {
    this.bst.remove(e);
  }
  contains(e: E): boolean {
    return this.bst.contains(e);
  }
  isEmpty(): boolean {
    return this.bst.getSize() === 0;
  }

  getSize(): number {
    return this.bst.getSize();
  }
}

export { BSTSet };
