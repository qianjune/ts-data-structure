/**
 * @description 二分搜索树
 * 存储的元素必须可以比较
 * 每个节点都大于它左边的左右的子节点，小于右边的子节点
 */

import ArrayQueue from "@root/experiment/algorithm/ArrayQueue";
import { Node } from ".";

class BTS2<E> {
  private root: Node<E>;
  private size: number;
  constructor() {
    this.root = null;
    this.size = 0;
  }
  /**
   * 判断index是否有效
   * @param index
   */
  // private judgeIndexValid(index: number) {
  //   if (index > this.size || index <= 0) {
  //     throw new Error("get failed! illegal index");
  //   }
  // }
  public getSize(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }
  /**
   * 添加元素
   * @param e
   */
  public add(e: E): void {
    this.root = this._add(this.root, e);
  }
  private _add(node: Node<E>, e: E): Node<E> {
    if (node === null) {
      this.size++;
      return new Node(e);
    }
    if (e > node.e) {
      node.right = this._add(node.right, e);
    } else if (e < node.e) {
      node.left = this._add(node.left, e);
    }
    //  不处理值相同的情况
    return node;
  }
  /**
   * 查看某个元素是否包含
   * @param e
   * @returns
   */
  public contains(e: E): boolean {
    return this._contains(this.root, e);
  }
  private _contains(node: Node<E>, e: E): boolean {
    if (node === null) {
      return false;
    }
    if (node.e === e) {
      return true;
    } else if (e < node.e) {
      return this._contains(node.left, e);
    } else {
      return this._contains(node.right, e);
    }
  }
  /**
   * 查找值为指定元素的Node
   * @param node
   * @param e
   * @returns
   */
  private _find(node: Node<E>, e: E): Node<E> {
    if (node === null) return null;
    if (node.e === e) {
      return node;
    } else if (e < node.e) {
      return this._find(node.left, e);
    } else {
      return this._find(node.right, e);
    }
  }
  private _findPre(node: Node<E>, e: E): Node<E> {
    if (node === null) return null;
    if (node.e === e) {
      return node;
    } else if (e < node.e) {
      return this._find(node.left, e);
    } else {
      return this._find(node.right, e);
    }
  }
  // 前序遍历
  public preOrder(): void {
    this._preOrder(this.root);
  }
  private _preOrder(node: Node<E>) {
    if (node === null) {
      return;
    }
    this._preOrder(node.left);
    this._preOrder(node.right);
  }
  // 中序遍历 - 排序后的结果
  public inOrder(): void {
    this._inOrder(this.root);
  }
  private _inOrder(node: Node<E>) {
    if (node === null) {
      return;
    }
    this._inOrder(node.left);
    this._inOrder(node.right);
  }
  // 后序遍历 - 排序后的结果
  public postOrder(): void {
    this._postOrder(this.root);
  }
  private _postOrder(node: Node<E>) {
    if (node === null) {
      return;
    }
    this._postOrder(node.left);
    this._postOrder(node.right);
  }
  // 层序遍历
  /**
   * 广度优先遍历-最短路径
   */
  public levelOrder(): void {
    const queue = new ArrayQueue<Node<E>>(20);
    queue.enqueue(this.root);
    while (!queue.isEmpty()) {
      const cur = queue.dequeue();
      console.log(`cur->${cur.e}`);
      if (cur.left !== null) {
        queue.enqueue(cur.left);
      }
      if (cur.right !== null) {
        queue.enqueue(cur.right);
      }
    }
  }
  public minimum(): E {
    if (this.size === 0) {
      throw new Error("BTS is empty");
    }
    // _minimum
    let cur = this.root;
    while (cur.left) {
      cur = cur.left;
    }
    // 如果是叶子节点直接删除，如果不是叶子节点就左子树的都拼到父节点的左边，反之同理
    return cur.e;
  }
  private _minimumNode(node = this.root): Node<E> {
    if (this.size === 0) {
      throw new Error("BTS is empty");
    }
    // _minimum
    let cur = node;
    while (cur.left) {
      cur = cur.left;
    }
    // 如果是叶子节点直接删除，如果不是叶子节点就左子树的都拼到父节点的左边，反之同理
    return cur;
  }
  /**
   * 删除最小值
   * @returns
   */
  public removeMin(): E {
    const ret = this.minimum();
    this.root = this._removeMin(this.root);
    return ret;
  }
  private _removeMin(node: Node<E>): Node<E> {
    if (node.left === null) {
      const rightNode = node.right;
      node.right = null;
      this.size--;
      return rightNode;
    }
    node.left = this._removeMin(node.left);
    return node;
  }
  /**
   * 删除最大值
   * @returns
   */
  public removeMax(): E {
    const ret = this.maximum();
    this.root = this._removeMax(this.root);
    return ret;
  }
  private _removeMax(node: Node<E>): Node<E> {
    if (node.right === null) {
      const leftNode = node.left;
      node.left = null;
      this.size--;
      return leftNode;
    }
    node.right = this._removeMax(node.right);
    return node;
  }

  /**
   * 删除某个元素
   * 对于有左右子树的元素来说，找右子树里最小的那个数来代替被删除元素
   * @param e
   */
  public remove(e: E): void {
    this.root = this._remove(this.root, e);
  }
  private _remove(node: Node<E>, e: E): Node<E> {
    // 1. 找到要被删除的元素
    if (node === null) return null;
    if (e < node.e) {
      node.left = this._remove(node.left, e);
      return node;
    } else if (e > node.e) {
      node.right = this._remove(node.right, e);
      return node;
    } else {
      if (node.left === null) {
        const rightNode = node.right;
        node.right = null;
        this.size--;
        return rightNode;
      } else if (node.right === null) {
        const leftNode = node.left;
        node.left = null;
        this.size--;
        return leftNode;
      } else {
        const successor = this._minimumNode(node.right);
        console.log(successor.e);
        successor.right = this._removeMin(node.right);
        successor.left = node.left;
        node.left = node.right = null;
        return successor;
      }
    }
    return node;

    // 2. 判断是否有左右两个子树
    // 3. 如果是单子树
    // 4. 如果是双子树
  }
  public maximum(): E {
    let cur = this.root;
    while (cur.right) {
      cur = cur.right;
    }
    return cur.e;
  }
  public toString(): string {
    return this.generateBTSString(this.root, 0, "");
  }
  private generateBTSString(node: Node<E>, depth: number, str: string) {
    if (node === null) {
      str = str + this.generateDepthString(depth) + "null\n";
      return str;
    }
    console.log(`depth:${depth}`);
    str = str + this.generateDepthString(depth) + `${node.e}\n`;
    str = this.generateBTSString(node.left, depth + 1, str);
    str = this.generateBTSString(node.right, depth + 1, str);
    return str;
  }
  private generateDepthString(depth: number) {
    let str = "";
    for (let i = 0; i < depth; i++) {
      str = str + "--";
    }
    return str;
  }
  /**
   * 大于e的那个数
   * @param e
   */
  // public floor(e: E): E { }
  /**
   * 小于e的那个数
   * @param e
   */
  // public ceil(e: E): E { }

  /**
   * e的排名
   * @param e
   */
  // public rank(e: E) { }
  /**
   * 排名index的e是什么
   * @param index
   */
  // public select(index: number) { }
}

const myBTS = new BTS2<number>();
myBTS.add(28);
myBTS.add(16);
myBTS.add(30);
myBTS.add(13);
myBTS.add(22);
myBTS.add(29);
myBTS.add(42);
myBTS.remove(30);
// myBTS.removeMin();
// myBTS.levelOrder();
// console.log(myBTS.minimum());
console.log(myBTS.toString());
export { BTS2 };
