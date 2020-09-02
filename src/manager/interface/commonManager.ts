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
  getInfo(id: number): Promise<ManagerResponse>;
  getList?(data: ListFilterInterface): Promise<ManagerResponse>;
}

export const buildCommonListParams = (
  { pageNo = 1, pageSize = 10 }: { pageNo: number, pageSize: number }): any => {
  return {
    limit: pageSize,
    offset: pageSize * (pageNo - 1),
    order: [
      ['id', 'desc']
    ],
  }
}

