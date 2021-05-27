/**
 * @description 数据结构 - List
 * https://zihengcat.github.io/2019/05/04/java-tutorial-for-language-adavanced-list-interface-and-implementations/
 */

interface List<E> {
  add(index: number, element: E): void;
  remove(index: number): E;
  get(index: number): E;
  set(index: number, element: E): E;
  indexOf(o: E): number;
  lastIndexOf(o: E): number;
}

class ArrayList<E> implements List<E> {
  private list: E[];
  private len: number;
  constructor(originList: E[]) {
    this.list = originList;
    this.len = originList.length;
  }

  public add(index: number, element: E): void {
    if (index < 0) {
      throw new Error("index illegal");
    }
    if (index === this.len) {
      this.list.push(element);
    } else if (index === 0) {
      this.list.unshift(element);
    } else {
      const before = this.list.slice(0, index);
      const after = this.list.slice(index);
      this.list = [...before, element, ...after];
    }

    this.len = this.list.length;
  }
  public remove(index: number): E {
    if (index >= this.len || index < 0) {
      throw new Error("index illegal");
    }
    const oldElement = this.list[index];
    if (index === this.len - 1) {
      this.list.pop();
    } else if (index === 0) {
      this.list.shift();
    } else {
      const before = this.list.slice(0, index);
      const after = this.list.slice(index + 1);
      this.list = [...before, ...after];
    }

    this.len = this.list.length;
    return oldElement;
  }
  public get(index: number): E {
    return this.list[index];
  }
  public set(index: number, element: E): E {
    const oldElement = this.list[index];
    this.list[index] = element;
    return oldElement;
  }
  public indexOf(o: E): number {
    return this.list.findIndex((item) => item === o); // 只能对比基本类型
  }
  public lastIndexOf(o: E): number {
    return this.list.lastIndexOf(o); // 只能对比基本类型
  }
}

export default ArrayList;
