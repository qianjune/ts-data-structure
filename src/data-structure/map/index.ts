/**
 * @description map
 * 一一对应
 */

export interface Map<K, V> {
  add(k: K, v: V): void;
  remove(k: K): void;
  contains(k: K): boolean;
  set(k: K, v: V): void;
  get(k: K): V;
  getSize(): number;
  isEmpty(): boolean;
}
