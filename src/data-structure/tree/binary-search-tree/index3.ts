/**
 * @description BST 存储key,value
 */

import ArrayQueue from "@root/experiment/algorithm/ArrayQueue";
class Node<K, V> {
  key: K;
  value: V;
  left: Node<K, V>;
  right: Node<K, V>;
  size: number; // 所有节点数包含自己，用雨rank和select
  depth: number; // 维护该节点在第几层
  count: number; // 可以用于存储重复元素，存储的个数
  // 构造函数重载
  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
class BTS3<K, V> {
  private root: Node<K, V>;
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
   * @param key
   */
  public add(key: K, value: V): void {
    this.root = this._add(this.root, key, value);
  }
  private _add(node: Node<K, V>, key: K, value: V): Node<K, V> {
    if (node === null) {
      this.size++;
      return new Node(key, value);
    }
    if (key > node.key) {
      node.right = this._add(node.right, key, value);
    } else if (key < node.key) {
      node.left = this._add(node.left, key, value);
    }
    //  不处理值相同的情况
    return node;
  }
  /**
   * 查看某个元素是否包含
   * @param key
   * @returns
   */
  public contains(key: K): boolean {
    return this._contains(this.root, key);
  }
  private _contains(node: Node<K, V>, key: K): boolean {
    if (node === null) {
      return false;
    }
    if (node.key === key) {
      return true;
    } else if (key < node.key) {
      return this._contains(node.left, key);
    } else {
      return this._contains(node.right, key);
    }
  }

  public get(key: K): Node<K, V> {
    return this._find(this.root, key);
  }
  public set(key: K, value: V): void {
    const node = this._find(this.root, key);
    if (node !== null) {
      this._find(this.root, key).value = value;
    }
  }
  /**
   * 查找值为指定元素的Node
   * @param node
   * @param key
   * @returns
   */
  private _find(node: Node<K, V>, key: K): Node<K, V> {
    if (node === null) return null;
    if (node.key === key) {
      return node;
    } else if (key < node.key) {
      return this._find(node.left, key);
    } else {
      return this._find(node.right, key);
    }
  }
  private _findPre(node: Node<K, V>, key: K): Node<K, V> {
    if (node === null) return null;
    if (node.key === key) {
      return node;
    } else if (key < node.key) {
      return this._find(node.left, key);
    } else {
      return this._find(node.right, key);
    }
  }
  // 前序遍历
  public preOrder(): void {
    this._preOrder(this.root);
  }
  private _preOrder(node: Node<K, V>) {
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
  private _inOrder(node: Node<K, V>) {
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
  private _postOrder(node: Node<K, V>) {
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
    const queue = new ArrayQueue<Node<K, V>>(20);
    queue.enqueue(this.root);
    while (!queue.isEmpty()) {
      const cur = queue.dequeue();
      console.log(`cur->${cur.key}`);
      if (cur.left !== null) {
        queue.enqueue(cur.left);
      }
      if (cur.right !== null) {
        queue.enqueue(cur.right);
      }
    }
  }
  public minimum(): K {
    if (this.size === 0) {
      throw new Error("BTS is empty");
    }
    // _minimum
    let cur = this.root;
    while (cur.left) {
      cur = cur.left;
    }
    // 如果是叶子节点直接删除，如果不是叶子节点就左子树的都拼到父节点的左边，反之同理
    return cur.key;
  }
  private _minimumNode(node = this.root): Node<K, V> {
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
  public removeMin(): K {
    const ret = this.minimum();
    this.root = this._removeMin(this.root);
    return ret;
  }
  private _removeMin(node: Node<K, V>): Node<K, V> {
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
  public removeMax(): K {
    const ret = this.maximum();
    this.root = this._removeMax(this.root);
    return ret;
  }
  private _removeMax(node: Node<K, V>): Node<K, V> {
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
   * @param key
   */
  public remove(key: K): void {
    this.root = this._remove(this.root, key);
  }
  private _remove(node: Node<K, V>, key: K): Node<K, V> {
    // 1. 找到要被删除的元素
    if (node === null) return null;
    if (key < node.key) {
      node.left = this._remove(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = this._remove(node.right, key);
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
        console.log(successor.key);
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
  public maximum(): K {
    let cur = this.root;
    while (cur.right) {
      cur = cur.right;
    }
    return cur.key;
  }
  public toString(): string {
    return this.generateBTSString(this.root, 0, "");
  }
  private generateBTSString(node: Node<K, V>, depth: number, str: string) {
    if (node === null) {
      str = str + this.generateDepthString(depth) + "null\n";
      return str;
    }
    console.log(`depth:${depth}`);
    str = str + this.generateDepthString(depth) + `${node.key}\n`;
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
   * @param key
   */
  // public floor(key:K): K { }
  /**
   * 小于e的那个数
   * @param key
   */
  // public ceil(key:K): K { }

  /**
   * e的排名
   * @param key
   */
  // public rank(key:K) { }
  /**
   * 排名index的e是什么
   * @param index
   */
  // public select(index: number) { }
}

const myBTS = new BTS3<number, string>();
myBTS.add(28, "a");
myBTS.add(16, "a");
myBTS.add(30, "a");
myBTS.add(13, "a");
myBTS.add(22, "a");
myBTS.add(29, "a");
myBTS.add(42, "a");
myBTS.remove(30);
// myBTS.removeMin();
// myBTS.levelOrder();
// console.log(myBTS.minimum());
console.log(myBTS.toString());
export { BTS3 };
