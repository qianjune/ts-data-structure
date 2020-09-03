/**
 * @description OrderManager orm
 */

import { CommonManager, ListFilterInterface } from "@src/manager/interface/commonManager";
import { ManagerResponse, ManagerResponseSuccess, ListDataModel, ResponseMsg, ManagerResponseFailure } from "@src/manager/response";

import sequelize from "@root/core/db";

const placeholder = 'OrderManager'
const responseMsg = ResponseMsg(placeholder)
 class OrderManagerManager implements CommonManager{
   create(data: any): Promise<import("../../../src/manager/response").ManagerResponse> {
     throw new Error("Method not implemented.");
   }
   edit(data: any): Promise<import("../../../src/manager/response").ManagerResponse> {
     throw new Error("Method not implemented.");
   }
   del(id: number): Promise<import("../../../src/manager/response").ManagerResponse> {
     throw new Error("Method not implemented.");
   }
   getInfo(id: number): Promise<import("../../../src/manager/response").ManagerResponse> {
     throw new Error("Method not implemented.");
   }
   getList?(data: ListFilterInterface): Promise<import("../../../src/manager/response").ManagerResponse> {
     throw new Error("Method not implemented.");
   }
   
 }

 export default OrderManagerManager