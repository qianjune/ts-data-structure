/**
 * @description 普通 Manager interface
 */

import { ManagerResponse } from "@src/manager/response";
import { RequestConfigInterface } from "@src/manager/interface/interface";

export interface ListFilterInterface {
  pageSize: number;
  pageNo: number;
  [keyName: string]: any;
}
export interface CommonManager {
  create(data: any): Promise<ManagerResponse<any>>;
  edit(
    data: any,
    config?: { [keyName: string]: any }
  ): Promise<ManagerResponse<any>>;
  del(id: number): Promise<ManagerResponse<any>>;
  getInfo(id: number): Promise<ManagerResponse<any>>;
  getList?(data: ListFilterInterface): Promise<ManagerResponse<any>>;
}

export const buildCommonListParams = (
  data: {
    pageNo?: number;
    pageSize?: number;
    order?: string[][];
  },
  config?: RequestConfigInterface
): any => {
  const { pageNo = 1, pageSize = 10, order = [["id", "desc"]] } = data;
  const exclude = config?.omit;
  const include = config?.include;
  let attributes: any = { exclude: [] };
  if (exclude) {
    attributes = { exclude };
  }
  if (include) {
    attributes = include;
  }
  return {
    limit: pageSize,
    offset: pageSize * (pageNo - 1),
    order,
    attributes,
  };
};
