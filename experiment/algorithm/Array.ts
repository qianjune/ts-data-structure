/**
 * @description 模仿Java Array
 */
class JArray<E> {
  private data: E[];
  private size: number;

  constructor(capacity?: number) {
    this.data = Array.from({ length: capacity || 10 });
    this.size = 0;
  }
  public from(arr: E[]): void {
    this.data = [...arr];
    this.size = arr.length;
  }
  public getSize(): number {
    return this.size;
  }

  public getCapacity(): number {
    return this.data.length;
  }

  public isEmpty(): boolean {
    return this.size === 0;
  }

  public add(index: number, e: E): void {
    if (index < 0 || index > this.size) {
      throw new Error("Add failed, Require index < 0 and index < size");
    }
    if (this.data.length === this.size) {
      this.resize(this.data.length * 2);
    }
    for (let i = this.size - 1; i >= index; i++) {
      this.data[i + 1] = this.data[i];
    }
    this.data[index] = e;
    this.size++;
  }

  public addFirst(e: E): void {
    this.add(0, e);
  }
  public addLast(e: E): void {
    this.add(this.size, e);
  }

  public remove(index: number): E {
    if (index < 0 || index > this.size) {
      throw new Error("Remove failed, Require index < 0 and index < size");
    }
    const ret: E = this.data[index];
    for (let i = index + 1; i < this.size; i++) {
      this.data[i - 1] = this.data[i];
    }
    this.size--;
    this.data[this.size] = null;
    if (this.size === this.data.length / 4 && this.data.length / 2 !== 0) {
      this.resize(this.data.length / 2);
    }
    return ret;
  }

  public removeFirst(): E {
    return this.remove(0);
  }

  public removeLast(): E {
    return this.remove(this.size - 1);
  }

  public find(e: E): number {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === e) {
        return i;
      }
    }
    return -1;
  }

  public removeElement(e: E): void {
    const index = this.find(e);
    if (index != -1) {
      this.remove(index);
    }
  }

  private resize(newCapacity: number): void {
    const newData: E[] = Array.from({ length: newCapacity });
    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
  }

  public contains(e: E): boolean {
    return this.find(e) !== -1;
  }

  public get(index: number): E {
    if (index < 0 || index > this.size)
      throw new Error("Get failed, Require index < 0 and index < size");
    return this.data[index];
  }

  public getFirst(): E {
    return this.get(0);
  }

  public getLast(): E {
    return this.get(this.size - 1);
  }
  public set(index: number, e: E): void {
    this.data[index] = e;
  }
  public swap(i: number, j: number): void {
    if (i < 0 || i >= this.size || j < 0 || j >= this.size || i === j) {
      throw new Error("i or j is not valid, please check it");
    }
    const store = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = store;
  }
  public toString(): string {
    let res = "";
    res += `Array: size = ${this.size}, capacity = ${this.data.length}\n`;
    res += "[";
    for (let i = 0; i < this.size; i++) {
      res += this.data[i];
      if (i < this.size - 1) res += ",";
    }
    res += "]";
    return res;
  }
}

export default JArray;
