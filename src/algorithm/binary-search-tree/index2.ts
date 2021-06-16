/**
 * @description 二分搜索树
 * 存储的元素必须可以比较
 * 每个节点都大于它左边的左右的子节点，小于右边的子节点
 */

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
      node.right = this._add(node.left, e)
    } else if (e < node.e) {
      node.left = this._add(node.right, e)
    }
    return node
  }
  contain() { }
  search() { }
}
