import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { DatePicker, Input, Tag } from "antd";
import { RuleObject } from "antd/es/form";

import { kgArr } from "@/constants";

const formConfig: (form?: any) => IFormConfig = (form) => {
  return {
    formExtend: true,
    formItems: [
      {
        key: "name",
        name: "品名",
        children: <Input></Input>,
        rules: [],
      },
      // {
      //   key: "transferCardCode",
      //   name: "流转卡编号",
      //   children: <Input></Input>,
      //   rules: [],
      // },
      // {
      //   key: "barCode",
      //   name: "订单号",
      //   children: <Input></Input>,
      //   rules: [],
      // },

      // {
      //   key: "partNumber",
      //   name: "零件料号",
      //   children: <Input></Input>,
      //   rules: [],
      // },

      {
        key: "spec",
        name: "规格",
        children: <Input></Input>,
        rules: [],
      },

      {
        key: "createTimeStart",
        name: "创建时间开始",
        children: (
          <DatePicker
            style={{ width: "100%" }}
            onChange={() => {
              if (form) {
                form.validateFields(["createTimeEnd"]);
              }
            }}
          ></DatePicker>
        ),
        rules: [
          (form: any) => {
            const createTimeStart = form.getFieldValue("createTimeStart");
            const createTimeEnd = form.getFieldValue("createTimeEnd");

            if (
              createTimeEnd &&
              createTimeStart &&
              createTimeEnd < createTimeStart
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
        key: "createTimeEnd",
        name: "创建时间结束",
        children: (
          <DatePicker
            style={{ width: "100%" }}
            onChange={() => {
              if (form) {
                form.validateFields(["createTimeStart"]);
              }
            }}
          ></DatePicker>
        ),
        rules: [
          (form: any) => {
            const createTimeStart = form.getFieldValue("createTimeStart");
            const createTimeEnd = form.getFieldValue("createTimeEnd");

            if (
              createTimeEnd &&
              createTimeStart &&
              createTimeEnd < createTimeStart
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
    rowKey: "id", // 唯一标识
    api: "queryOutSourceCheckNew",
    defaultParam: { inspectionStatus: "1" },
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
        width: 260,
      },
      {
        title: "订单号",
        dataIndex: "orderid",
        key: "orderid",
        width: 140,
      },
      {
        title: "条码",
        dataIndex: "itmid",
        key: "itmid",
        width: 140,
      },
      {
        title: "行号",
        dataIndex: "u9LineNo",
        key: "u9LineNo",
        width: 80,
      },
      {
        title: "追溯单号",
        dataIndex: "traceabilityNumber",
        key: "traceabilityNumber",
        width: 110,
      },

      {
        title: "品名",
        dataIndex: "name",
        key: "name",
        width: 140,
      },

      {
        title: "规格",
        dataIndex: "spec",
        key: "spec",
        width: 100,
      },
      {
        title: "材质",
        dataIndex: "itmtdid",
        key: "itmtdid",
        width: 100,
      },

      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        width: 160,
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
        width: 100,
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
        title: "订单数量",
        dataIndex: "newsupcount",
        key: "newsupcount",
        width: 110,
      },
      {
        title: "等级",
        dataIndex: "inspectionLevel",
        key: "inspectionLevel",
        width: 60,
        fixed: "right",
        render: (text) => {
          const greenLevelArr = ["A+", "A"];
          return (
            <Tag color={greenLevelArr.indexOf(text) !== -1 ? "green" : "red"}>
              {text}
            </Tag>
          );
        },
      },

      // {
      //   title: "流转数量累积",
      //   dataIndex: "alreadySend",
      //   key: "alreadySend",
      //   width: 120,
      //   render: (data: any, record) => {
      //     const unit = record?.unit;
      //     if (kgArr.indexOf(unit) !== -1) {
      //       return data?.alreaySendNumKG;
      //     }
      //     return data?.alreaySendNumPCS;
      //   },
      // },

      // {
      //   title: "流转桶数",
      //   dataIndex: "barrelCount",
      //   key: "barrelCount",
      //   width: 120,
      //   render: (barrelCount: any) => {
      //     return barrelCount?.countBarrel;
      //   },
      // },
      // {
      //   title: "单桶流转数量",
      //   dataIndex: "singleNumber",
      //   key: "singleNumber",
      //   width: 110,
      //   render: (text, record) => {
      //     const isKg = kgArr.indexOf(record?.unit) !== -1;
      //     return isKg ? record?.transferKg : record?.transferPcs;
      //   },
      // },

      {
        title: "检验状态",
        dataIndex: "inspectionStatus",
        key: "inspectionStatus",
        width: 100,
        fixed: "right",
        render: (text) => (
          <Tag color={text === "已检" ? "green" : "red"}>{text}</Tag>
        ),
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
