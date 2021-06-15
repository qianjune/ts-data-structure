/**
 * @description 二分搜索树
 */

class Node {
  key: number;
  value: number;
  left: Node;
  right: Node;
  // 构造函数重载
  constructor({
    key,
    value,
    left,
    right,
  }: {
    key: number;
    value: number;
    left: Node;
    right: Node;
  });
  constructor({ key, value, left, right }: Node) {
    this.key = key;
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BTS {
  root: Node;
  count: number;
  constructor() {
    this.root = null;
    this.count = 0;
  }
  size(): number {
    return this.count;
  }
  isEmpty(): boolean {
    return this.count === 0;
  }
  insert(node: Node, key: number, value: string) {
    if (node === null) {
    }
  }
  contain() { }
  search() { }
}
