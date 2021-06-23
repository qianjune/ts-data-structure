/**
 * @description 二分搜索树
 * 存储的元素必须可以比较
 * 每个节点都大于它左边的左右的子节点，小于右边的子节点
 */

class Node<E> {
  e: E;
  left: Node<E>;
  right: Node<E>;
  size: number; // 所有节点数包含自己，用雨rank和select
  depth: number; // 维护该节点在第几层
  count: number; // 可以用于存储重复元素，存储的个数
  // 构造函数重载
  constructor(e: E) {
    this.e = e;
    this.left = null;
    this.right = null;
  }
}

class BTS<E> {
  private root: Node<E>;
  private size: number;
  constructor() {
    this.root = null;
    this.size = 0;
  }

  public getSize(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }
  public add(e: E) {
    if (this.root === null) {
      this.root = new Node(e);
      this.size++;
    } else {
      this._add(this.root, e);
    }
  }
  private _add(node: Node<E>, e: E) {
    if (node.e === e) {
      return;
    } else if (e < node.e && node.left === null) {
      node.left = new Node(e);
      this.size++;
      return;
    } else if (e > node.e && node.right === null) {
      node.right = new Node(e);
      this.size++;
      return;
    }
    if (e > node.e) {
      this._add(node.right, e);
    } else {
      this._add(node.left, e);
    }
  }
}

export { Node };
