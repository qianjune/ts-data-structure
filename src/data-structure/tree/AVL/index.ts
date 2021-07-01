/**
 * @description AVL
 * 存储的元素必须可以比较
 * 每个节点都大于它左边的左右的子节点，小于右边的子节点
 * 右旋转：1-4
 * 时间复杂度logn,绝对不会退化成链表，因为有左右旋转处理高度
 * 优化角度：
 * 1. 当高度不变时，父节点及祖先节点就不需要检查重新维护了
 */

import ArrayQueue from "@root/experiment/algorithm/ArrayQueue";

class Node<K, V> {
  key: K; // K是可比较的
  value: V;
  left: Node<K, V>;
  right: Node<K, V>;
  height: number;

  // 构造函数重载
  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;

    this.height = 1;
  }
}

class AVLTree<K, V> {
  private root: Node<K, V>;
  private size: number;
  private keys: Set<K>;
  constructor() {
    this.root = null;
    this.size = 0;
    this.keys = new Set();
  }
  public keySet(): Set<K> {
    return this.keys;
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
  private getHeight(node: Node<K, V>): number {
    if (node === null) {
      return 0;
    }
    return node.height;
  }
  /**
   * 获取节点的平衡因子
   */
  private getBalanceFactor(node: Node<K, V>): number {
    if (node === null) return 0;
    return this.getHeight(node.left) - this.getHeight(node.right);
  }
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * LL：不平衡的点在左孩子的左侧
   * 对节点进行向右旋转，返回旋转后的新节点
   *       y                           x
   *      / \                         /  \
   *     x   T4    向右旋转（y）       z    y
   *    / \       ----------->      / \  / \
   *   z  T3                       T1 T2 T3 T4
   *  / \
   * T1  T2
   */
  private rightRotato(y: Node<K, V>): Node<K, V> {
    const x = y.left;
    const T3 = x.right;
    x.right = y;
    y.left = T3;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), y.height) + 1;
    return x;
  }

  /**
   * RR：不平衡的点在右孩子的右侧
   * 对节点进行向左旋转，返回旋转后的新节点
   *       y                            x
   *      / \                          /  \
   *     T1  x    向左旋转（y）         y    z
   *        / \    ----------->      / \  / \
   *      T2   z                    T1 T2 T3 T4
   *          / \
   *         T3 T4
   */
  private leftRotato(y: Node<K, V>): Node<K, V> {
    const x = y.right;
    const T2 = x.left;
    x.left = y;
    y.right = T2;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.right), y.height) + 1;
    return x;
  }
  /**
   * 添加元素
   * @param key
   */
  public add(key: K, value: V): void {
    this.root = this._add(this.root, key, value);
    this.keys.add(key);
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
    // 上层节点高度要加1
    node.height =
      Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    const balanceFactor = this.getBalanceFactor(node);
    if (Math.abs(balanceFactor) > 1) {
      console.log(`balanceFactor: ${balanceFactor}, unbalanced`);
    }
    // 平衡维护
    if (balanceFactor > 1 && this.getBalanceFactor(node.left) >= 0) {
      // LL,左侧层级过深,进行右旋转
      return this.rightRotato(node);
    } else if (balanceFactor < -1 && this.getBalanceFactor(node.right) <= 0) {
      // RR,右侧层级过深,进行左旋转
      return this.leftRotato(node);
    } else if (balanceFactor < -1 && this.getBalanceFactor(node.right) >= 0) {
      // RL 右子树的左孩子
      node.right = this.rightRotato(node.right);
      return this.leftRotato(node);
    } else if (balanceFactor > 1 && this.getBalanceFactor(node.left) <= 0) {
      // LR 左子树的右孩子
      node.left = this.leftRotato(node.left);
      return this.rightRotato(node);
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
  private getNode(node = this.root, key: K): Node<K, V> {
    if (node === null) {
      return null;
    }
    if (node.key === key) {
      return node;
    } else if (key < node.key) {
      return this.getNode(node.left, key);
    } else {
      return this.getNode(node.right, key);
    }
  }
  public get(key: K): V {
    return this.getNode(this.root, key)?.value;
  }
  public set(key: K, value: V): void {
    const node = this.getNode(this.root, key);
    if (node !== null) {
      node.value = value;
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
  // 中序遍历 - 结果是按大小顺序的
  public inOrder(): void {
    this._inOrder(this.root);
  }
  // 判断是否是二分搜索树
  public isBST(): boolean {
    const keys: K[] = [];
    this._inOrder(this.root, keys);
    console.log(keys);
    let res = true;
    for (let i = 1; i < keys.length; i++) {
      if (keys[i - 1] > keys[i]) {
        res = false;
        break;
      }
    }
    return res;
  }
  /**
   * 判断是否是平衡二叉树
   */
  public isBalanced(): boolean {
    return this._isBalanced(this.root);
  }
  private _isBalanced(node: Node<K, V>): boolean {
    if (node === null) {
      return true;
    }
    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor > 1) return false;
    return this._isBalanced(node.left) && this._isBalanced(node.right);
  }
  private _inOrder(node: Node<K, V>, keys?: K[]) {
    if (node === null) {
      return;
    }
    this._inOrder(node.left, keys);
    keys.push(node.key);
    this._inOrder(node.right, keys);
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
  public remove(key: K): V {
    const ret = this.get(key);
    this.root = this._remove(this.root, key);
    this.keys.delete(key);
    return ret;
  }
  private _remove(node: Node<K, V>, key: K): Node<K, V> {
    // 1. 找到要被删除的元素
    if (node === null) return null;
    let retNode;
    if (key < node.key) {
      // 找左子树
      node.left = this._remove(node.left, key);
      retNode = node;
    } else if (key > node.key) {
      // 找右子树
      node.right = this._remove(node.right, key);
      retNode = node;
    } else {
      // 2. 判断是否有左右两个子树
      // 3. 如果是单子树
      // 4. 如果是双子树
      if (node.left === null) {
        // 左子树为空
        const rightNode = node.right;
        node.right = null;
        this.size--;
        retNode = rightNode;
      } else if (node.right === null) {
        // 右子树为空
        const leftNode = node.left;
        node.left = null;
        this.size--;
        retNode = leftNode;
      } else {
        // 左右子树都存在
        const successor = this._minimumNode(node.right);
        console.log(successor.key);
        // successor.right = this._removeMin(node.right); // 在removeMin中也添加平衡维护，或者
        successor.right = this._remove(node.right, successor.key);
        successor.left = node.left;
        node.left = node.right = null;
        retNode = successor;
      }
      if (retNode === null) return null; // 删除的是叶子节点的情况
      // 更新深度
      retNode.height = Math.max(
        this.getHeight(retNode.left),
        this.getHeight(retNode.right)
      );
      const balanceFactor = this.getBalanceFactor(retNode);
      // 平衡维护
      if (balanceFactor > 1 && this.getBalanceFactor(retNode.left) >= 0) {
        // LL,左侧层级过深,进行右旋转
        return this.rightRotato(retNode);
      } else if (
        balanceFactor < -1 &&
        this.getBalanceFactor(retNode.right) <= 0
      ) {
        // RR,右侧层级过深,进行左旋转
        return this.leftRotato(retNode);
      } else if (
        balanceFactor < -1 &&
        this.getBalanceFactor(retNode.right) >= 0
      ) {
        // RL 右子树的左孩子
        retNode.right = this.rightRotato(retNode.right);
        return this.leftRotato(retNode);
      } else if (
        balanceFactor > 1 &&
        this.getBalanceFactor(retNode.left) <= 0
      ) {
        // LR 左子树的右孩子
        retNode.left = this.leftRotato(retNode.left);
        return this.rightRotato(retNode);
      }
      // 不需要调整的情况
      return retNode;
    }
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
  // public floor(key: K): K { }
  /**
   * 小于e的那个数
   * @param key
   */
  // public ceil(key: K): K { }

  /**
   * e的排名
   * @param key
   */
  // public rank(key: K) { }
  /**
   * 排名index的e是什么
   * @param index
   */
  // public select(index: number) { }
}

const myAVLTree = new AVLTree<number, string>();
myAVLTree.add(28, "a");
myAVLTree.add(16, "b");
myAVLTree.add(30, "c");
myAVLTree.add(13, "d");
myAVLTree.add(22, "key");
myAVLTree.add(29, "f");
myAVLTree.add(42, "g");
myAVLTree.add(12, "g");
myAVLTree.add(11, "g");
// myAVLTree.remove(30);
// myAVLTree.removeMin();
// myAVLTree.levelOrder();
// console.log(myAVLTree.minimum());
console.log(myAVLTree.toString());
console.log(myAVLTree.isBST());
export { AVLTree };
