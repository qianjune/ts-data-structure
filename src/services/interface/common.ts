/**
 * @description 普通Service interface
 */
export interface CommonService {
  create(data: object): void;
  edit<T>(data: T): void;
  del(id: number): void;
  getInfo(id: number): void;
}