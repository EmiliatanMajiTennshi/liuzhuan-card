import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";

import { CustomInput } from "@/components/CustomInput";

const formConfig: (props?: any) => IFormConfig = ({ form }) => {
  return {
    formExtend: true,
    formItems: [
      {
        key: "productName",
        name: "产品名称",
        children: <CustomInput></CustomInput>,
        rules: [],
      },
      {
        key: "quantity",
        name: "数量",
        children: <CustomInput></CustomInput>,
        rules: [],
      },
      {
        key: "createdBy",
        name: "申请人",
        children: <CustomInput></CustomInput>,
        rules: [],
      },
    ],
    handleDate: true,
  };
};

const tableConfig: (props: ITableConfigProps) => ITableConfig = (props) => {
  // const { setMultiDetailModalOpen, setIssueID } = props;
  return {
    rowKey: "id", // 唯一标识
    api: "findMoldInfo",
    columns: [
      {
        title: "id",
        dataIndex: "id",
      },

      {
        title: "产品名称",
        dataIndex: "productName",
      },
      {
        title: "数量",
        dataIndex: "quantity",
      },
      {
        title: "申请人",
        dataIndex: "createdBy",
      },
      {
        title: "产品描述",
        dataIndex: "description",
      },
      {
        title: "需求数量申请人",
        dataIndex: "prodReqSub",
      },
      {
        title: "生产提交需求描述",
        dataIndex: "prodReqDesc",
      },
      {
        title: "创建日期",
        dataIndex: "createdAt",
      },
      {
        title: "状态",
        dataIndex: "status",
      },
    ],
  };
};

export { formConfig, tableConfig };
