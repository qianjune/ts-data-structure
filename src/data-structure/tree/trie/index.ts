/**
 * @description 字典树/前缀树
 * 用来处理字符串
 * 时间复杂度和字符串的长度相关：w：代表字符长度
 * 每一个节点有26个子节点（不包含大小姐，符号的情况）
 * 问题：208/211
 */

class Node {
  isWord: boolean; // 当前的节点是否是一个单词的结尾 如：pan/panda
  next: Map<string, Node>;
  constructor(isWord?: boolean) {
    this.isWord = isWord ?? false;
    this.next = new Map();
  }
}

class Trie {
  root: Node;
  size: number;
  constructor() {
    this.root = new Node();
    this.size = 0;
  }
  public getSize(): number {
    return this.size;
  }
  public add(word: string): void {
    // 非递归方式
    let cur = this.root;
    for (let i = 0; i < word.length; i++) {
      const c = word[i];
      if (!cur.next.get(c)) {
        cur.next.set(c, new Node());
      }
      cur = cur.next.get(c);
    }
    if (!cur.isWord) {
      cur.isWord = true;
      this.size++;
    }
  }
  public contains(word: string): boolean {
    let cur = this.root;
    for (let i = 0; i < word.length; i++) {
      const c = word[i];
      if (cur.next.get(c) === null) {
        return false;
      }
      cur = cur.next.get(c);
    }
    return cur.isWord;
  }
  // 问题211处理（.处理）
  private match(node: Node, word: string, index: number): boolean {
    if (index === word.length) {
      return node.isWord;
    }
    for (let i = 0; i < word.length; i++) {
      const cur = word.charAt(i);
      if (cur !== ".") {
        // 如果不是.走正常匹配逻辑
        if (node.next.get(cur) === null) {
          return false;
        }
        return this.match(node.next.get(cur), word, index + 1);
      } else {
        // 如果是点，就循环map里所有的key，去匹配
        for (const nextChar in node.next.keys) {
          if (this.match(node.next.get(nextChar), word, index + 1)) {
            return true;
          }
        }
        return false;
      }
    }
  }
  // 寻找前缀
  public prefix(prefix: string): boolean {
    let cur = this.root;
    for (let i = 0; i < prefix.length; i++) {
      const c = prefix[i];
      if (cur.next.get(c) === null) {
        return false;
      }
      cur = cur.next.get(c);
    }
    return true;
  }
}

export { Trie };
