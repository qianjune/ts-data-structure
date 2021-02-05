/**
 * @description BrowseRecords service
 */
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import BrowseRecordsManager from "@src/manager/v2/browseRecords";
const browseRecordsManager = new BrowseRecordsManager();
class BrowseRecordsService implements CommonService {
  async create(data: any): Promise<void> {
    const result = await browseRecordsManager.create(data);
    ResponseHandler.send(result);
  }
  async edit<T>(data: T): Promise<void> {
    const result = await browseRecordsManager.edit(data);
    ResponseHandler.send(result);
  }
  async del(id: number): Promise<void> {
    const result = await browseRecordsManager.del(id);
    ResponseHandler.send(result);
  }
  async getInfo(id: number): Promise<void> {
    const result = await browseRecordsManager.getInfo(id);
    ResponseHandler.send(result);
  }
  async getList?(data: any): Promise<void> {
    const result = await browseRecordsManager.getList(data);
    ResponseHandler.send(result);
  }
}

export default BrowseRecordsService;
