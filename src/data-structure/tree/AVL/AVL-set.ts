/**
 * @description 基于AVL实现set接口
 */

import { Set } from "@src/data-structure/set";
import { AVLTree } from ".";

class AVLSet<E> implements Set<E> {
  private avl: AVLTree<E, null>;
  constructor(e: E) {
    this.avl = new AVLTree<E, null>();
  }
  add(e: E): void {
    this.avl.add(e, null);
  }
  remove(e: E): void {
    this.avl.remove(e);
  }
  contains(e: E): boolean {
    return this.avl.contains(e);
  }
  getSize(): number {
    return this.avl.getSize();
  }
  isEmpty(): boolean {
    return this.avl.isEmpty();
  }
}

export { AVLSet };
