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
  edit(data: any): Promise<ManagerResponse>;
  del(id: number): Promise<ManagerResponse>;
  getInfo(id: number): void;
  getList?(data: ListFilterInterface): Promise<ManagerResponse>;
}

