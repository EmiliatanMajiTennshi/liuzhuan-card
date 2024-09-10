import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { Input } from "antd";

const formConfig: (form?: any) => IFormConfig = (form) => {
  return {
    formExtend: true,
    formItems: [
      {
        key: "partNumber",
        name: "零件料号",
        children: <Input></Input>,
        rules: [],
      },
      {
        key: "name",
        name: "品名",
        children: <Input></Input>,
        rules: [],
      },

      {
        key: "specs",
        name: "规格",
        children: <Input></Input>,
        rules: [],
      },
    ],
  };
};

const tableConfig: (props: ITableConfigProps) => ITableConfig = (props) => {
  return {
    rowKey: "id", // 唯一标识
    api: "queryRawMaterial",

    columns: [
      {
        title: "零件料号",
        dataIndex: "partNumber",
        key: "partNumber",
        width: 130,
      },

      {
        title: "品名",
        dataIndex: "name",
        key: "name",
        width: 150,
      },
      {
        title: "规格",
        dataIndex: "specs",
        key: "specs",
        width: 100,
      },
      {
        title: "材质",
        dataIndex: "material",
        key: "material",
        width: 100,
      },
      {
        title: "表面处理",
        dataIndex: "surfaceTreatment",
        key: "surfaceTreatment",
        width: 100,
      },
      {
        title: "字样",
        dataIndex: "trademark",
        key: "trademark",
        width: 150,
      },

      {
        title: "单位",
        dataIndex: "unit",
        key: "unit",
        width: 100,
      },
      {
        title: "库存",
        dataIndex: "count",
        key: "count",
        width: 100,
      },
    ],
  };
};

export { formConfig, tableConfig };
