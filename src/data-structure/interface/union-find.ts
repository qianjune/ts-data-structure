/**
 * @description 并查集接口
 */

export interface UnionFind {
  union(p: number, q: number): void;
  isConnected(p: number, q: number): boolean; // -> find(p) === find(q)
  getSize(): number;
  find(p: number): number;
}
