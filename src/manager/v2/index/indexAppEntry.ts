/**
 * @description IndexAppEntryManager orm
 */

import { CommonManager, ListFilterInterface, buildCommonListParams } from "@src/manager/interface/commonManager";
import { ManagerResponse, ManagerResponseSuccess, ListDataModel, ResponseMsg, ManagerResponseFailure } from "@src/manager/response";

import sequelize from "@root/core/db";

const placeholder = 'IndexAppEntryManager'
const responseMsg = ResponseMsg(placeholder)
class IndexAppEntryManager implements CommonManager {
  create(data: any): Promise<ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  edit(data: any): Promise<ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  del(id: number): Promise<ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  getInfo(id: number): Promise<ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  getList?(data: ListFilterInterface): Promise<ManagerResponse> {
    throw new Error("Method not implemented.");
  }

}

export default IndexAppEntryManager