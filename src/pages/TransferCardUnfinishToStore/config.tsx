import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { DatePicker, Input } from "antd";
import { RuleObject } from "antd/es/form";

import { formatDate } from "@/utils";

const formConfig: (form?: any) => IFormConfig = (form) => {
  return {
    formItems: [
      {
        key: "barCode",
        name: "生产订单条码",
        children: <Input></Input>,
        rules: [],
      },
      {
        key: "partNumber",
        name: "料号",
        children: <Input></Input>,
        rules: [],
      },
      {
        key: "transferCardCode",
        name: "流转卡编号",
        children: <Input></Input>,
        rules: [],
      },
      {
        key: "specs",
        name: "规格",
        children: <Input></Input>,
        rules: [],
      },
      {
        key: "department",
        name: "事业部",
        children: <Input></Input>,
        rules: [],
      },
      {
        key: "traceabilityNumber",
        name: "追溯条码",
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
      {
        key: "finishTimeStart",
        name: "完成时间开始",
        children: (
          <DatePicker
            style={{ width: "100%" }}
            onChange={() => {
              if (form) {
                form.validateFields(["finishTimeEnd"]);
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
              if (form) {
                form.validateFields(["finishTimeStart"]);
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
    rowKey: "id", // 唯一标识
    api: "queryUnfinishCardToStore",
    columns: [
      {
        title: "事业部",
        dataIndex: "department",
        key: "department",
        width: 120,
      },
      {
        title: "流转卡编号",
        dataIndex: "transferCardCode",
        key: "transferCardCode",
        width: 240,
      },
      {
        title: "追溯条码",
        dataIndex: "traceabilityNumber",
        key: "traceabilityNumber",
        width: 110,
      },
      {
        title: "生产订单条码",
        dataIndex: "barCode",
        key: "barCode",
        width: 160,
      },
      {
        title: "料号",
        dataIndex: "partNumber",
        key: "partNumber",
        width: 130,
      },
      {
        title: "规格",
        dataIndex: "specs",
        key: "specs",
        width: 100,
      },
      {
        title: "品名",
        dataIndex: "name",
        key: "name",
        width: 170,
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        width: 160,
      },

      {
        title: "完成时间",
        dataIndex: "finishTime",
        key: "finishTime",
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
    ],
  };
};

export { formConfig, tableConfig };
