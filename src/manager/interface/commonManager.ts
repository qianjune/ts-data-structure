/**
 * @description 普通 Manager interface
 */


export interface ListFilterInterface {
  pageSize: number,
  pageNo: number, [keyName: string]: any
}
export interface CommonManager {
  create(data: any): void;
  edit<T>(data: T): void;
  del(id: number): void;
  getInfo(id: number): void;
  getList?(data: ListFilterInterface): void;
}

