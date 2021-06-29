/**
 * @description quick find
 * find 时间复杂度 1
 */

import { UnionFind } from "@src/data-structure/interface/union-find";
import JUtil from "@src/util";

class UnionFind1 implements UnionFind {
  private id: number[];
  constructor(size: number) {
    this.id = Array.from({ length: size ?? 10 });
    for (let i = 0; i < size; i++) {
      this.id[i] = i;
    }
  }
  public union(p: number, q: number): void {
    throw new Error("Method not implemented.");
  }
  private find(p: number): number {
    JUtil.isPositionValid(p, this.id.length);
    return this.id[p];
  }
  public isConnected(p: number, q: number): boolean {
    return this.find(p) === this.find(q);
  }
  public getSize(): number {
    return this.id.length;
  }
  // 合并p和q所属的集合, 复杂度n
  public unionElement(p: number, q: number): void {
    const pID = this.find(p);
    const qID = this.find(q);
    if (pID === qID) return;
    for (let i = 0; i < this.id.length; i++) {
      if (this.id[i] === pID) {
        this.id[i] = qID;
      }
    }
  }
}

export { UnionFind1 };
