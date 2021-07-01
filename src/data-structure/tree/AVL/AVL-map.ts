/**
 * @description 基于AVL实现的映射
 */

import { Map } from "@src/data-structure/map";
import { AVLTree } from ".";

class AVLMap<K, V> implements Map<K, V> {
  private map: AVLTree<K, V>;
  constructor() {
    this.map = new AVLTree<K, V>();
  }
  keySet(): Set<K> {
    return this.map.keySet();
  }
  add(k: K, v: V): void {
    this.map.add(k, v);
  }
  remove(k: K): V {
    return this.map.remove(k);
  }
  contains(k: K): boolean {
    return this.map.contains(k);
  }
  set(k: K, v: V): void {
    this.map.set(k, v);
  }
  get(k: K): V {
    return this.map.get(k);
  }
  getSize(): number {
    return this.map.getSize();
  }
  isEmpty(): boolean {
    return this.map.isEmpty();
  }
}

export { AVLMap };
