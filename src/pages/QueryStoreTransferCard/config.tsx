import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { DatePicker, Input } from "antd";
import { RuleObject } from "antd/es/form";

import { kgArr } from "@/constants";
import { formatDate } from "@/utils";
import { CustomInput } from "@/components/CustomInput";

const formConfig: (props?: any) => IFormConfig = ({ form }) => {
  return {
    formExtend: true,
    formItems: [
      {
        key: "transferCardCode",
        name: "流转卡编号",
        children: <CustomInput allowScanner></CustomInput>,
        rules: [],
      },
      {
        key: "barCode",
        name: "订单号",
        children: <CustomInput></CustomInput>,
        rules: [],
      },

      {
        key: "partNumber",
        name: "零件料号",
        children: <CustomInput></CustomInput>,
        rules: [],
      },

      {
        key: "specs",
        name: "规格",
        children: <CustomInput></CustomInput>,
        rules: [],
      },

      {
        key: "finishTimeStart",
        name: "完成时间开始",
        children: (
          <DatePicker
            style={{ width: "100%" }}
            onChange={() => {
              if (form?.validateFields) {
                form?.validateFields(["finishTimeEnd"]);
              }
            }}
          ></DatePicker>
        ),
        rules: [
          (form: any) => {
            const finishTimeStart = form.getFieldValue("finishTimeStart");
            const finishTimeEnd = form.getFieldValue("finishTimeEnd");

            if (
              finishTimeEnd &&
              finishTimeStart &&
              finishTimeEnd < finishTimeStart
            ) {
              return {
                validator: true,
                message: "开始日期不能晚于结束",
              } as unknown as RuleObject;
            }
            return undefined as unknown as RuleObject;
          },
        ],
      },
      {
        key: "finishTimeEnd",
        name: "完成时间结束",
        children: (
          <DatePicker
            style={{ width: "100%" }}
            onChange={() => {
              if (form?.validateFields) {
                form?.validateFields(["finishTimeStart"]);
              }
            }}
          ></DatePicker>
        ),
        rules: [
          (form: any) => {
            const finishTimeStart = form.getFieldValue("finishTimeStart");
            const finishTimeEnd = form.getFieldValue("finishTimeEnd");

            if (
              finishTimeEnd &&
              finishTimeStart &&
              finishTimeEnd < finishTimeStart
            ) {
              return {
                validator: true,
                message: "结束日期不能早于开始",
              } as unknown as RuleObject;
            }

            return undefined as unknown as RuleObject;
          },
        ],
      },
    ],
    handleDate: true,
  };
};

const tableConfig: (props: ITableConfigProps) => ITableConfig = (props) => {
  return {
    rowKey: "key", // 唯一标识
    api: "queryTransferCardToStoreNew",
    columns: [
      //   {
      //     title: "流转卡类型",
      //     dataIndex: "transferCardType",
      //     key: "transferCardType",
      //     width: 100,
      //   },
      //   {
      //     title: "零件类型",
      //     dataIndex: "type",
      //     key: "type",
      //     width: 100,
      //   },

      {
        title: "流转卡编号",
        dataIndex: "transferCardCode",
        key: "transferCardCode",
        width: 160,
      },
      {
        title: "生产订单号",
        dataIndex: "barCode",
        key: "barCode",
        width: 100,
      },
      {
        title: "零件料号",
        dataIndex: "partNumber",
        key: "partNumber",
        width: 100,
      },
      {
        title: "追溯单号",
        dataIndex: "traceabilityNumber",
        key: "traceabilityNumber",
        width: 80,
      },
      {
        title: "品名",
        dataIndex: "name",
        key: "name",
        width: 80,
      },
      {
        title: "规格",
        dataIndex: "specs",
        key: "specs",
        width: 80,
      },
      {
        title: "材质",
        dataIndex: "material",
        key: "material",
        width: 80,
      },
      {
        title: "字样",
        dataIndex: "trademark",
        key: "trademark",
        width: 100,
      },
      {
        title: "完成时间",
        dataIndex: "finishTime",
        key: "finishTime",
        width: 100,
      },
      //   {
      //     title: "入库料号",
      //     dataIndex: "storePartNumber",
      //     key: "storePartNumber",
      //     width: 130,
      //   },

      {
        title: "单位",
        dataIndex: "unit",
        key: "unit",
        width: 60,
      },
      //   {
      //     title: "商标",
      //     dataIndex: "trademark",
      //     key: "trademark",
      //     width: 80,
      //   },

      //   {
      //     title: "创建(流转)时间",
      //     dataIndex: "createTime",
      //     key: "createTime",
      //     width: 160,
      //   },
      //   {
      //     title: "热处理炉台",
      //     dataIndex: "heatTreatmentFurnacePlatform",
      //     key: "heatTreatmentFurnacePlatform",
      //     width: 120,
      //   },
      //   {
      //     title: "优先顺序",
      //     dataIndex: "priorityOrder",
      //     key: "priorityOrder",
      //     width: 120,
      //   },

      {
        title: "订单数量kg",
        dataIndex: "productionKg",
        key: "productionKg",
        width: 100,
      },
      {
        title: "订单数量pcs",
        dataIndex: "productionPcs",
        key: "productionPcs",
        width: 100,
      },
      {
        title: "流转数量kg",
        dataIndex: "transferKg",
        key: "transferKg",
        width: 100,
      },
      {
        title: "流转数量pcs",
        dataIndex: "transferPcs",
        key: "transferPcs",
        width: 100,
      },
      {
        title: "入库数量",
        dataIndex: "ctotal",
        key: "ctotal",
        width: 100,
      },
      {
        title: "入库单位",
        dataIndex: "cunit",
        key: "cunit",
        width: 100,
      },
      {
        title: "入库名",
        dataIndex: "bname",
        key: "bname",
        width: 100,
      },
      {
        title: "入库时间",
        dataIndex: "caddtime",
        key: "caddtime",
        width: 100,
        render: (text) => text?.slice(0, 19),
      },
      // {
      //   title: "查看工艺",
      //   dataIndex: "processList",
      //   key: "processList",
      //   render: (data: any[]) => {
      //     console.log(data, 1112);

      //     return (

      //     );
      //   },
      //   width: 100,
      //   fixed: "right",
      // },
      //
    ],
  };
};

export { formConfig, tableConfig };
