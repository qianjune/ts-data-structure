import {
  TablePageConfigInterface,
  FilterProps,
  FormItemInterface,
  FormItemType,
  TableBuilderProps,
  ColumnsProps,
} from "@mjune/buried-point/src/interface/list-page";

interface DbColumns {
  [keyName: string]: {
    type: {
      key: string;
    };
    comment: string;
    [keyName: string]: any;
  };
}

const getTypeComp = (type: string): FormItemType => {
  let result = "input";
  if (type === "number" || type === "string") {
    result = "input";
  }
  return result;
};
const filterPropsBuilder = (
  parameters: {
    name: string;
    in: string;
    required: boolean;
    type: string;
  }[]
): FilterProps => {
  const result: FormItemInterface[] = parameters.map((param) => {
    return {
      label: param.name,
      name: param.name,
      type: getTypeComp(param.type),
    };
  });
  return {
    config: result,
  };
};
const tableColumnsBuilder = (d: DbColumns): ColumnsProps => {
  const result: ColumnsProps = [];
  Object.keys(d).forEach((key) => {
    result.push({
      title: d[key].comment,
      dataIndex: key,
    });
  });
  return result;
};
const tablePropsBuilder = (dbColumns: DbColumns) => {
  const columns = tableColumnsBuilder(dbColumns);
  return {
    columns,
  };
};

const listPageConfigBuilder = (
  parameters = [
    { name: "pageSize", in: "query", required: true, type: "number" },
    { name: "pageNo", in: "query", required: true, type: "number" },
    { name: "name", in: "query", required: true, type: "string" },
  ],
  dbColumns = {
    id: {
      type: { key: "INTEGER" },
      comment: "品牌id",
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: { key: "STRING" },
      allowNull: false,
      comment: "品牌名",
    },
    logo: {
      type: { key: "STRING" },
      comment: "品牌logo",
    },
    desc: {
      type: { key: "STRING" },
      comment: "品牌描述",
    },
    shopId: {
      type: { key: "INTEGER" },
      comment: "关联的店铺id",
    },
  }
) => {
  const filterProps: FilterProps = filterPropsBuilder(parameters);
  const tableProps: TableBuilderProps = tablePropsBuilder(dbColumns);
};
