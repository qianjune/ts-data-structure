/**
 * @description 产品 orm
 */

import { Product, ProductCategory, ShopModel } from "@src/db/models";
import {
  ManagerResponse,
  ManagerResponseSuccess,
  ListDataModel,
  ResponseMsg,
  ManagerResponseFailure,
} from "@src/manager/response";
import { omit, cloneDeep } from "lodash";
import attribute from "@src/api/v2/shop/attribute";
import {
  buildCommonListParams,
  CommonManager,
  ListFilterInterface,
} from "@src/manager/interface/commonManager";
import { RequestConfigInterface } from "@src/manager/interface/interface";

const placeholder = "商品";
const responseMsg = ResponseMsg(placeholder);

interface goodsInfo {
  skuGroup: string;
  shopDetail: { name: string };
  [propsName: string]: any;
}

class ProductManager implements CommonManager {
  public skuGroupOriginDataToCodeHandler = (crd: any) => {
    if (crd.skuGroup) {
      crd.skuGroup = crd.skuGroup
        .filter((sg: any) => sg.enabled === 1)
        .map((sg: any, j: number) => {
          const attributeGroup = omit(sg, ["enabled", "salePrice"]);
          const attributeKeys = Object.keys(attributeGroup);
          const attributeLen = attributeKeys.length;
          let attributeCode = "";
          if (attributeLen > 0) {
            attributeKeys.forEach((key, keyIndex) => {
              attributeCode += `${key}|${attributeGroup[key]}`;
              if (keyIndex < attributeLen - 1) attributeCode += "-";
            });
          }
          sg.code = attributeCode;
          sg = omit(sg, [...attributeKeys, "enabled"]);
          return sg;
        });
    }
  };

  _shopInfoHandler(row: goodsInfo): goodsInfo {
    const cloneRow = { ...row };
    cloneRow.shopName = cloneRow.shopDetail.name;
    delete cloneRow.shopDetail;
    return cloneRow;
  }
  async create(data: {
    name: string;
    shopId: number;
    skuGroup: any[] | string;
  }): Promise<ManagerResponse<any>> {
    const productInfo = await Product.findOne({
      where: {
        name: data.name,
        shopId: data.shopId,
      },
    });
    if (productInfo) {
      return new ManagerResponse({
        success: false,
        msg: responseMsg.CREATE_FAIL_BY_NAME_OCCUPIED,
      });
    }
    const cloneData = { ...data };
    cloneData.skuGroup = JSON.stringify(cloneData.skuGroup);
    const result = await Product.create(cloneData);
    // const bindRelationWithShop = await ShopProductRelation.create({
    //   shopId: data.shopId,
    //   productId: result.getDataValue('id')
    // }, { transaction: t })
    if (result) {
      return new ManagerResponse({
        success: true,
        msg: responseMsg.CREATE_SUCCESS,
        data: result,
      });
    } else {
      return new ManagerResponse({
        success: true,
        msg: responseMsg.CREATE_FAIL,
        data: result,
      });
    }
  }
  async edit<T>(data: any): Promise<ManagerResponse<any>> {
    const { id } = data;
    const productInfo = await Product.findOne({
      where: {
        id,
      },
      include: [
        {
          model: ShopModel,
          as: "shopDetail",
          attributes: ["name"],
        },
      ],
    });
    if (!productInfo) {
      return new ManagerResponseFailure({ msg: responseMsg.ITEM_NOT_FOUND });
    }
    const result = await Product.update(data, {
      where: {
        id,
      },
    });
    if (result[0] > 0) {
      return new ManagerResponseSuccess({
        data: null,
        msg: responseMsg.EDIT_SUCCESS,
      });
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.EDIT_FAIL });
    }
  }
  del(id: number): Promise<ManagerResponse<any>> {
    throw new Error("Method not implemented.");
  }
  async getInfo(id: number): Promise<ManagerResponse<any>> {
    const productInfo = await Product.findOne({
      where: {
        id,
      },
      include: [
        {
          model: ShopModel,
          as: "shopDetail",
          attributes: ["name"],
        },
      ],
    });
    if (!productInfo) {
      return new ManagerResponseFailure({ msg: responseMsg.ITEM_NOT_FOUND });
    }
    let cloneProduct: any = productInfo.toJSON();
    cloneProduct = this._shopInfoHandler(cloneProduct);
    cloneProduct.skuGroup = JSON.parse(cloneProduct.skuGroup);
    this.skuGroupOriginDataToCodeHandler(cloneProduct);
    return new ManagerResponseSuccess({
      data: cloneProduct,
      msg: responseMsg.GET_DETAIL_SUCCESS,
    });
  }

  async _getListByCategory(data: { categoryId: number }) {
    const { categoryId } = data;
    const result = await ProductCategory.findOne({
      where: {
        id: categoryId,
      },
      include: [
        {
          model: Product,
          through: {
            where: { categoryId },
            attributes: [],
          },
          attributes: ["id", "name", "mainImage"],
        },
      ],
    });
    const list = result.getDataValue("Products");
    return list;
  }

  async getList(
    data: ListFilterInterface & { shopId?: number },
    config?: RequestConfigInterface
  ): Promise<ManagerResponse<any>> {
    const { pageSize = 10, pageNo = 1, shopId, belong } = data;
    const where = global.util.lodash.omitNil({ shopId, belong });
    const listParams = buildCommonListParams({ pageNo, pageSize }, config);
    let productList: any[] = [];
    let count = 0;
    if (belong) {
      productList = await this._getListByCategory({ categoryId: belong });
      count = productList.length;
    } else {
      const result = await Product.findAndCountAll({
        ...listParams,
        // include: [
        //   // {
        //   //   model: ShopModel,
        //   //   as: "shopDetail",
        //   //   attributes: ["name"],
        //   // },
        //   {
        //     model: ProductCategory,
        //     through: {
        //       where: { categoryId: belong },
        //     },
        //     attributes: ["name", "id"],
        //   },
        // ],
        where,
      });
      const { rows, count: originCount } = result;
      count = originCount;
      productList = rows.map((row) => {
        const cloneRow = { ...row.toJSON() } as goodsInfo;
        // cloneRow = this._shopInfoHandler(cloneRow);

        if (cloneRow.skuGroup) {
          cloneRow.skuGroup = JSON.parse(cloneRow.skuGroup);
        }
        this.skuGroupOriginDataToCodeHandler(cloneRow);
        return cloneRow;
      });
    }

    return new ManagerResponseSuccess({
      data: new ListDataModel({
        data: productList,
        total: count,
        pageNo,
        pageSize,
      }),
      msg: responseMsg.FETCH_LIST_SUCCESS,
    });
  }
}

export default ProductManager;
