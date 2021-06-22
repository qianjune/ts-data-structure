/**
 * @description 二分搜索树
 * 存储的元素必须可以比较
 * 每个节点都大于它左边的左右的子节点，小于右边的子节点
 */

import { Node } from ".";

class BTS2<E>{
  private root: Node<E>;
  private size: number;
  constructor() {
    this.root = null;
    this.size = 0;
  }

  public getSize(): number {
    return this.size
  }

  isEmpty(): boolean {
    return this.size === 0;
  }
  public add(e: E) {
    this.root = this._add(this.root, e)
  }
  private _add(node: Node<E>, e: E): Node<E> {
    if (node === null) {
      this.size++
      return new Node(e)
    }
    if (e > node.e) {
      node.right = this._add(node.right, e)
    } else if (e < node.e) {
      node.left = this._add(node.left, e)
    }
    return node
  }
  public contains(e: E): boolean {
    return this._contains(this.root, e)
  }
  private _contains(node: Node<E>, e: E): boolean {
    if (node === null) {
      return false
    }
    if (node.e === e) {
      return true
    } else if (e < node.e) {
      return this._contains(node.left, e)
    } else {
      return this._contains(node.right, e)
    }
  }
  // 前序遍历
  public preOrder() {
    this._preOrder(this.root)
  }
  private _preOrder(node: Node<E>) {
    if (node === null) {
      return
    }
    console.log(node.e)
    this._preOrder(node.left)
    this._preOrder(node.right)
  }
  // 中序遍历 - 排序后的结果
  public inOrder() {
    this._inOrder(this.root)
  }
  private _inOrder(node: Node<E>) {
    if (node === null) {
      return
    }
    this._inOrder(node.left)
    console.log(node.e)
    this._inOrder(node.right)
  }
  // 后序遍历 - 排序后的结果
  public postOrder() {
    this._postOrder(this.root)
  }
  private _postOrder(node: Node<E>) {
    if (node === null) {
      return
    }
    this._postOrder(node.left)
    this._postOrder(node.right)
    console.log(node.e)
  }
  public toString(): string {
    return this.generateBTSString(this.root, 0, '')
  }
  private generateBTSString(node: Node<E>, depth: number, str: string) {
    if (node === null) {
      str = str + this.generateDepthString(depth) + 'null\n'
      return str
    }
    str = str + this.generateDepthString(depth) + `${node.e}\n`
    str = this.generateBTSString(node.left, depth + 1, str)
    str = this.generateBTSString(node.right, depth + 1, str)
    return str
  }
  private generateDepthString(depth: number) {
    let str = ''
    for (let i = 0; i < depth; i++) {
      str = str + '--'
    }
    return str
  }
  search() { }
}


export {BTS2}
