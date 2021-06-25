export interface Queue<E> {
  dequeue(): E;
  getFront(): E;
  getSize(): number;
  isEmpty(): boolean;
  enqueue(e: E): void;
}
