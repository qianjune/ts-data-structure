import {
  ManagerResponse,
  ResponseMsg,
  ManagerResponseFailure,
  ManagerResponseSuccess,
  ListDataModel,
} from "@src/manager/response";
// import sequelize, { inTransaction } from "@root/core/db";
import { AttributeKey, AttributeValue } from "@src/db/models";
import {
  CommonManager,
  ListFilterInterface,
} from "@src/manager/interface/commonManager";

export interface AttributeItemInterface {
  key: string;
  values: (string | number)[];
}
const placeholder = "属性名";
const responseMsg = ResponseMsg(placeholder);
class AttributeManager implements CommonManager {
  async create(data: AttributeItemInterface): Promise<ManagerResponse<any>> {
    const { key, values } = data;
    console.log(data);
    const attributeKey = await AttributeKey.findOne({
      where: {
        name: key,
      },
    });
    if (attributeKey) {
      return new ManagerResponseFailure({
        msg: responseMsg.CREATE_FAIL_BY_NAME_OCCUPIED,
      });
    }
    // return await inTransaction(async (t: any) => {
    //   const newAttributeKey = await AttributeKey.create(
    //     {
    //       name: key,
    //     },
    //     { transaction: t }
    //   );
    //   if (newAttributeKey) {
    //     const { id } = newAttributeKey.toJSON() as any;
    //     const valuesData = values.map((v) => {
    //       return { value: v, keyId: id };
    //     });
    //     const valuesResult = await AttributeValue.bulkCreate(valuesData, {
    //       transaction: t,
    //     });
    //     console.log("valuesResult", valuesResult);
    //     if (valuesResult && valuesResult.length === values.length) {
    //       const result = newAttributeKey;
    //       result.setDataValue(
    //         "values",
    //         valuesResult.map((v) => (v.toJSON() as any).value)
    //       );
    //       return new ManagerResponseSuccess({
    //         msg: responseMsg.CREATE_SUCCESS,
    //         data: result,
    //       });
    //     }
    //   } else {
    return new ManagerResponseFailure({ msg: responseMsg.CREATE_FAIL });
    //   }
    // });
  }
  edit(data: any): Promise<ManagerResponse<any>> {
    throw new Error("Method not implemented.");
  }
  async del(id: number): Promise<ManagerResponse<any>> {
    const attributeKey = await AttributeKey.findOne({
      where: {
        id,
      },
    });
    if (!attributeKey) {
      return new ManagerResponseFailure({
        msg: responseMsg.ITEM_NOT_FOUND,
      });
    }
    // return await inTransaction(async (t: any) => {
    //   const delKey = await AttributeKey.destroy({
    //     where: {
    //       id,
    //     },
    //     transaction: t,
    //   });
    //   const delValues = await AttributeValue.destroy({
    //     where: {
    //       keyId: id,
    //     },
    //     transaction: t,
    //   });

    //   if (delKey && delValues) {
    //     return new ManagerResponseSuccess({
    //       msg: responseMsg.DELETE_SUCCESS,
    //       data: true,
    //     });
    //   } else {
    return new ManagerResponseFailure({ msg: responseMsg.DELETE_FAIL });
    //   }
    // });
  }
  getInfo(id: number): Promise<ManagerResponse<any>> {
    throw new Error("Method not implemented.");
  }
  async getList?(data: ListFilterInterface): Promise<ManagerResponse<any>> {
    const { pageSize = 10, pageNo = 1 } = data;
    const result = await AttributeKey.findAndCountAll({
      limit: pageSize,
      offset: pageSize * (pageNo - 1),
      order: [["id", "desc"]],
      include: [
        {
          model: AttributeValue,
          as: "values",
          attributes: ["value"],
        },
      ],
    });
    const { count, rows } = result;
    const attributeList = rows.map((row) => {
      const data: any = row.toJSON();
      data.values = data.values.map((v: { value: string | number }) => v.value);
      // data.shopName = data.shopModel.name
      // delete data.shopModel
      return data;
    });
    return new ManagerResponseSuccess({
      data: new ListDataModel({
        data: attributeList,
        total: count,
        pageNo,
        pageSize,
      }),
      msg: responseMsg.FETCH_LIST_SUCCESS,
    });
  }
}

export default AttributeManager;
