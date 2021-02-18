import { ProductCategory } from "@src/db/models";
import {
  CommonManager,
  ListFilterInterface,
  buildCommonListParams,
} from "@src/manager/interface/commonManager";
import {
  ManagerResponseSuccess,
  ManagerResponseFailure,
  ResponseMsg,
  ManagerResponse,
  ListDataModel,
} from "@src/manager/response";
import { RequestConfigInterface } from "@src/manager/interface/interface";
/**
 * @description
 * 1. 没有shopId的是公共分类
 * 2. 公共分类的顶层为parentId = 0
 * 3. 分类为逐级增加，店铺分类不继承公共分类的level，重新计算
 * 4. 公共分类运营商统一创建，计划至少3到4层
 */
export interface CategoryItemInterface {
  name: string;
  parentId?: number;
  shopId?: number;
  level?: number;
}
export interface CategoryListParamsInterface extends ListFilterInterface {
  parentId?: number;
  shopId?: number;
  level?: number;
}
const placeholder = "分类";
const responseMsg = ResponseMsg(placeholder);
class CategoryManager implements CommonManager {
  async create(data: CategoryItemInterface): Promise<ManagerResponse<any>> {
    const { name, parentId = 0 } = data;
    const category = await ProductCategory.findOne({
      where: {
        name,
        parentId,
      },
    });
    // const parentCategory = await ProductCategory.findOne({
    //   where: {
    //     id: parentId,
    //   },
    // });

    if (category) {
      return new ManagerResponseFailure({
        msg: responseMsg.CREATE_FAIL_BY_NAME_OCCUPIED,
      });
    }
    console.log("data...", data);
    // 如果分类没有传parentId，默认为跟分类后的第一级
    if (global.util.lodash.isNil(data.parentId)) {
      data.parentId = 0;
      // data.level = 1;
    } else {
      // const parentResult = parentCategory.toJSON() as any;
      // 判断父级是否为通用分类，自身为店铺分类
      // if (!parentResult.shopId && data.shopId) {
      //   data.level = 0;
      // } else {
      //   data.level = parentResult.level + 1;
      // }
    }

    const result = await ProductCategory.create(data);
    console.log(result);
    if (result) {
      return new ManagerResponseSuccess({
        msg: responseMsg.CREATE_SUCCESS,
        data: result,
      });
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.CREATE_FAIL });
    }
  }
  async edit(data: { id: number }): Promise<ManagerResponse<any>> {
    const { id } = data;
    const category = await ProductCategory.findOne({
      where: {
        id,
      },
    });
    if (!category) {
      return new ManagerResponseFailure({ msg: responseMsg.ITEM_NOT_FOUND });
    }
  }
  async del(id: number): Promise<ManagerResponse<any>> {
    const category = await ProductCategory.findOne({
      where: {
        id,
      },
    });
    if (!category) {
      return new ManagerResponseFailure({ msg: responseMsg.ITEM_NOT_FOUND });
    }
    const list = await ProductCategory.findAndCountAll({
      where: {
        parentId: id,
      },
    });
    if (list.count > 0) {
      return new ManagerResponseFailure({
        msg: responseMsg.DELETE_FAIL_BY_HAVE_LINKED_CHILD,
      });
    }
    const result = await ProductCategory.destroy({
      where: {
        id,
      },
    });
    console.log(result, "result");
    if (result) {
      return new ManagerResponseSuccess({
        msg: responseMsg.DELETE_SUCCESS,
        data: true,
      });
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.DELETE_FAIL });
    }
  }
  getInfo(id: number): Promise<ManagerResponse<any>> {
    throw new Error("Method not implemented.");
  }
  async getList?(
    data: CategoryListParamsInterface,
    config?: RequestConfigInterface
  ): Promise<ManagerResponse<any>> {
    const {
      pageSize = 10,
      pageNo = 1,
      parentId = 0,
      shopId,
      level,
      status,
    } = data;
    const where = global.util.lodash.omitNil({
      parentId,
      shopId,
      level,
      status,
    });
    const result = await ProductCategory.findAndCountAll({
      ...buildCommonListParams({ pageNo, pageSize }, config),
      where,
    });
    const { count, rows } = result;
    const categoryList = rows.map((row) => {
      const data: any = row.toJSON();
      // data.shopName = data.shopModel.name
      // delete data.shopModel
      return data;
    });

    return new ManagerResponseSuccess({
      data: new ListDataModel({
        data: categoryList,
        total: count,
        pageNo,
        pageSize,
      }),
      msg: responseMsg.FETCH_LIST_SUCCESS,
    });
  }
}

export default CategoryManager;