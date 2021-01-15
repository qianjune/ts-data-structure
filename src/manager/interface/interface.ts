export interface CommonManagerInterface<T, U> {
  create(data: T): void;
  update(data: U): void;
  destroy(id: string): void;
  getValidateData(data: { [propKey: string]: any }): void;
}

export interface RequestConfigInterface {
  omit?: string[];
  include?: string[];
}
