import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { CustomInput } from "@/components/CustomInput";

const formConfig: (props?: any) => IFormConfig = ({ form, navigate }) => {
  return {
    formExtend: true,
    formItems: [
      {
        key: "customFields1",
        name: "零件料号",
        children: <CustomInput></CustomInput>,
        rules: [],
      },
      {
        key: "goodsName",
        name: "品名",
        children: <CustomInput></CustomInput>,
        rules: [],
      },

      {
        key: "customFields2",
        name: "规格",
        children: <CustomInput></CustomInput>,
        rules: [],
      },
    ],
  };
};

const tableConfig: (props: ITableConfigProps) => ITableConfig = (props) => {
  return {
    rowKey: "id", // 唯一标识
    api: "queryPfInfoByPfId",

    columns: [
      {
        title: "零件料号",
        dataIndex: "customFields1",
        key: "customFields1",
        width: 130,
      },

      {
        title: "品名",
        dataIndex: "goodsName",
        key: "goodsName",
        width: 150,
      },
      {
        title: "规格",
        dataIndex: "customFields2",
        key: "customFields2",
        width: 100,
      },
      {
        title: "材质",
        dataIndex: "customFields3",
        key: "customFields3",
        width: 100,
      },

      {
        title: "单位",
        dataIndex: "uname",
        key: "uname",
        width: 100,
      },
      {
        title: "库存",
        dataIndex: "count",
        key: "count",
        width: 100,
      },

      {
        title: "配发数量",
        dataIndex: "pfcount",
        key: "pfcount",
        width: 100,
      },
      {
        title: "配发日期",
        dataIndex: "pftime",
        key: "pftime",
        width: 100,
      },
    ],
  };
};

export { formConfig, tableConfig };
