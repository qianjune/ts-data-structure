/**
 * @description 普通 Manager interface
 */

import { ManagerResponse } from "../response";


export interface ListFilterInterface {
  pageSize: number,
  pageNo: number,
  [keyName: string]: any
}
export interface CommonManager {
  create(data: any): Promise<ManagerResponse>;
  edit<T>(data: T): void;
  del(id: number): void;
  getInfo(id: number): void;
  getList?(data: ListFilterInterface): void;
}

