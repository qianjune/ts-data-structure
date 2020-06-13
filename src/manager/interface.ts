export interface CommonManagerInterface<T,U> {
    creat(data: T): void;
    update(data: U): void;
    destroy(id: string): void;
    getValidateData(data: {[propKey: string]: any}): void;
}

