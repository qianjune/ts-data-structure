/**
 * @description 普通Service interface
 */
export interface CommonService {
  create(data: any): Promise<void>;
  edit<T>(data: T): void;
  del(id: number): Promise<void>;
  getInfo(id: number): Promise<void>;
  getList?(data: any): Promise<void>
}