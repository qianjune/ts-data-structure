/**
 * @description 普通 Manager interface
 */

export interface CommonManager {
  create(data: object): void;
  edit<T>(data: T): void;
  del(id: number): void;
  getInfo(id: number): void;
}