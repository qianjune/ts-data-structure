import { CommonService } from "@src/services/interface/common";
import ProductManager from "@micro-services/mall-service/src/manager/product";
import { ResponseHandler } from "@src/utils/responseHandler";
import { RequestConfigInterface } from "@src/manager/interface/interface";
import { Product } from "@src/db/models";
import { ManagerResponseFailure } from "@src/manager/response";
import ShopManager from "../manager/shop";

const productManager = new ProductManager();
const shopManager = new ShopManager();
class ProductService implements CommonService {
  async edit(data: any): Promise<void> {
    const result = await productManager.edit(data);
    ResponseHandler.send(result);
  }

  async create(data: any): Promise<void> {
    const result = await productManager.create(data);
    ResponseHandler.send(result);
  }

  del(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getInfo(id: number): Promise<void> {
    const result = await productManager.getInfo(id);
    const cloneResult = { ...result };
    console.log(cloneResult);
    ResponseHandler.send(cloneResult);
  }
  async getList(data: any): Promise<void> {
    const result = await productManager.getList(data);
    ResponseHandler.send(result);
  }
  async getListForApp(
    data: any,
    config?: RequestConfigInterface
  ): Promise<void> {
    const result = await productManager.getList(data, config);
    const cloneResult = { ...result };
    ResponseHandler.send(cloneResult);
  }

  async putOnTheShelf(data: {
    id: number;
    userId: number;
    status: number;
  }): Promise<void> {
    const { id, userId, status } = data;
    // 根据id查询商品所属的店铺id - shopId
    const productInfo = await productManager._getInfo({ id });
    if (productInfo?.status === !status) {
      // 根据shopI查询店铺详情获取店铺所属的用户userId
      if (productInfo?.shopId) {
        const shopInfo = await shopManager._getInfo({ id: productInfo.shopId });
        // 比对userId是否一致
        if (shopInfo?.Users?.id === userId) {
          // 如果一致进入产品状态修改
          const result = await productManager.edit({
            id,
            status,
          });
          ResponseHandler.send(result);
        }
      }
    }
    // 如果不匹配返回错误

    ResponseHandler.send(
      new ManagerResponseFailure({
        msg: status === Product.ONLINE ? "上架失败" : "下架失败",
      })
    );
  }

  /**
   * 修改库存
   * @param data
   */
  async modifyStock(data: {
    id: number;
    userId: number;
    stock: number;
  }): Promise<void> {
    const { id, userId, stock } = data;
    // 根据id查询商品所属的店铺id - shopId
    const productInfo = await productManager._getInfo({ id });
    if (productInfo?.status === Product.OFFLINE) {
      // 根据shopI查询店铺详情获取店铺所属的用户userId
      if (productInfo?.shopId) {
        const shopInfo = await shopManager._getInfo({ id: productInfo.shopId });
        // 比对userId是否一致
        if (shopInfo?.Users?.id === userId) {
          // 如果一致进入产品库存修改
          const result = await productManager.edit({
            id,
            stock,
          });
          ResponseHandler.send(result);
        }
      }
    }
    // 如果不匹配返回错误

    ResponseHandler.send(
      new ManagerResponseFailure({
        msg: "修改库存失败",
      })
    );
  }
}

export default ProductService;
