/**
 * @description 线段树（区间树）
 * 解决问题：
 * 1. 区间染色问题
 * 2. 区间查询
 * 用数组实现复杂度是n，数据量大时不好
 * 用线段树logn
 * 每一个节点存储的是一个区间的内容
 * 线段树不是完全二叉树，但是是平衡二叉树
 * 存储空间：有n的元素的话，需要4n的空间来存储
 */

import { Merger } from "@src/data-structure/interface/merger";
import JUtil from "@src/util";

class SegmentTree<E> {
  private data: E[];
  private tree: E[];
  private merger: Merger<E>;
  constructor(arr: E[], merger: Merger<E>) {
    this.data = [...arr];
    this.tree = Array.from({ length: 4 * this.data.length || 20 });
    this.merger = merger;
    this.buildSegmentTree(0, 0, this.data.length - 1);
  }
  private buildSegmentTree(treeIndex: number, l: number, r: number) {
    if (l === r) {
      this.tree[treeIndex] = this.data[l];
      return;
    }
    const leftChildIndex = this.leftChild(treeIndex);
    const rightChildIndex = this.rightChild(treeIndex);
    const mid = l + Math.floor((r - l) / 2);
    console.log(`mid: ${mid}`);
    this.buildSegmentTree(leftChildIndex, l, mid);
    this.buildSegmentTree(rightChildIndex, mid + 1, r);
    this.tree[treeIndex] = this.merger.merge(
      this.tree[leftChildIndex],
      this.tree[rightChildIndex]
    );
  }
  public query(queryL: number, queryR: number): E {
    return this._query(0, 0, this.data.length - 1, queryL, queryR);
  }
  private _query(
    treeIndex: number,
    l: number,
    r: number,
    queryL: number,
    queryR: number
  ): E {
    if (l === queryL && r === queryR) {
      return this.tree[treeIndex];
    }
    const mid = l + Math.floor((r - l) / 2);
    const leftChildIndex = this.leftChild(treeIndex);
    const rightChildIndex = this.rightChild(treeIndex);

    if (queryL >= mid + 1) {
      // 完全在右边
      return this._query(rightChildIndex, mid + 1, r, queryL, queryR);
    } else if (queryR <= mid) {
      // 完全在左边
      return this._query(leftChildIndex, l, mid, queryL, queryR);
    }
    const leftResult: E = this._query(leftChildIndex, l, mid, queryL, mid);
    const rightResult: E = this._query(
      rightChildIndex,
      mid + 1,
      r,
      mid + 1,
      queryR
    );
    return this.merger.merge(leftResult, rightResult);
  }
  public get(index: number): E {
    return this.data[index];
  }
  public getSize(): number {
    return this.data.length;
  }
  private leftChild(index: number): number {
    return 2 * index + 1;
  }
  private rightChild(index: number): number {
    return 2 * index + 2;
  }
  public toString(): void {
    console.log(JUtil.arrayToString(this.tree));
  }
}

const nums = [-2, 0, 3, -5, 2, -1];
const mySegmentTree = new SegmentTree<number>(nums, {
  merge: (a, b) => {
    return a + b;
  },
});
mySegmentTree.toString();
console.log(mySegmentTree.query(2, 5));
export { SegmentTree };
