/**
 * @description cname service
 */
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import { RequestConfigInterface } from "@src/manager/interface/interface";
import XXXXXXManager from "#BASE_LOCATION/manager/xXXXXX";
const xXXXXXManager = new XXXXXXManager();
class XXXXXXService implements CommonService {
  /**
   * 创建
   * @param data
   */
  async create(data: any): Promise<void> {
    const result = await xXXXXXManager.create(data);
    return result;
  }

  /**
   * 编辑
   * @param data
   */
  async edit<T>(data: T): Promise<void> {
    const result = await xXXXXXManager.edit(data);
    return result;
  }

  /**
   * 删除
   * @param id
   */
  async del(id: number): Promise<void> {
    const result = await xXXXXXManager.del(id);
    return result;
  }

  /**
   * 获取详情
   * @param id
   */
  async getInfo(id: number): Promise<void> {
    const result = await xXXXXXManager.getInfo(id);
    return result;
  }

  /**
   * 获取列表
   * @param data
   * @param config
   */
  async getList?(data: any, config?: RequestConfigInterface): Promise<void> {
    const result = await xXXXXXManager.getList(data);
    return result;
  }
}

export default XXXXXXService;
