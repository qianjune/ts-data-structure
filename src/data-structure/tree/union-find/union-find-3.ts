/**
 * @description 优化union，每次让层级小的去指向层级大的，防止最大层级越来越大，影响时间复杂度h
 * union a,b 代表，找到a的根节点去指向b的根节点
 * 每次union时间复杂度都为h，h为所在树的深度
 * find 是否相同，复杂度也为h，通过查看根节点是否相同判断
 */

import { UnionFind } from "@src/data-structure/interface/union-find";

class UnionFind3 implements UnionFind {
  private parent: number[];
  private sz: number[];
  constructor(size: number) {
    this.parent = Array.from({ length: size });
    this.sz = Array.from({ length: size });
    for (let i = 0; i < size; i++) {
      // 初始化都指向自己
      this.parent[i] = i;
      this.sz[i] = 1;
    }
  }
  /**
   * 找到根节点
   * @param p
   * @returns
   */
  find(p: number): number {
    while (p !== this.parent[p]) {
      p = this.parent[p];
    }
    return p;
  }
  union(p: number, q: number): void {
    const pRoot = this.find(p);
    const qRoot = this.find(q);
    if (pRoot === qRoot) return;
    // 节点数量，反之层级过深
    if (this.sz[pRoot] < this.sz[qRoot]) {
      this.parent[pRoot] = qRoot;
      this.sz[qRoot] += this.sz[pRoot];
    } else {
      this.parent[qRoot] = pRoot;
      this.sz[pRoot] += this.sz[qRoot];
    }
  }
  isConnected(p: number, q: number): boolean {
    return this.find(p) === this.find(q);
  }
  getSize(): number {
    return this.parent.length;
  }
}

export { UnionFind3 };
