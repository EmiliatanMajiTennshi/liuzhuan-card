import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { Button, DatePicker, Input, Select } from "antd";
import { RuleObject } from "antd/es/form";

import { checkProcess, formatDate } from "@/utils";
import { FINISHED_CODE, SEMI_FINISHED_CODE } from "@/constants";
import { sumTransferNumberRender } from "@/utils/tableRender";

const formConfig: (form: any) => IFormConfig = (form) => {
  return {
    formItems: [
      // {
      //   key: "type",
      //   name: "零件类型",
      //   children: (
      //     <Select
      //       options={[
      //         { value: "标准", label: "标准零件" },
      //         { value: "非标", label: "非标零件" },
      //       ]}
      //     ></Select>
      //   ),
      //   rules: [],
      // },
      {
        key: "barCode",
        name: "生产订单条码",
        children: <Input></Input>,
        rules: [],
      },
      {
        key: "partNumber",
        name: "零件料号",
        children: <Input></Input>,
        rules: [],
      },
      {
        key: "category",
        name: "类别",
        children: (
          <Select
            allowClear
            options={[
              { value: SEMI_FINISHED_CODE, label: "半成品" },
              { value: FINISHED_CODE, label: "成品" },
            ]}
          ></Select>
        ),
        rules: [],
      },
      {
        key: "specs",
        name: "规格",
        children: <Input></Input>,
        rules: [],
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
  const { setIssueModalOpen, setIssueID } = props;
  return {
    api: "queryUnHalfTransferCard",
    queryFlowCardApi: "queryUnFlowCardInfoById",
    flowCardType: "common",
    rowKey: "id",
    columns: [
      {
        title: "零件类型",
        dataIndex: "type",
        key: "type",
        width: 100,
      },

      {
        title: "生产订单条码",
        dataIndex: "barCode",
        key: "barCode",
        width: 150,
      },
      {
        title: "零件料号",
        dataIndex: "partNumber",
        key: "partNumber",
        width: 150,
      },
      {
        title: "品名",
        dataIndex: "name",
        key: "name",
        width: 140,
      },
      {
        title: "规格",
        dataIndex: "specs",
        key: "specs",
        width: 100,
      },
      {
        title: "商标",
        dataIndex: "trademark",
        key: "trademark",
        width: 80,
      },
      {
        title: "完成时间",
        dataIndex: "finishTime",
        key: "finishTime",
        width: 100,
      },
      {
        title: "单位",
        dataIndex: "unit",
        key: "unit",
        width: 100,
      },
      {
        title: "数量",
        dataIndex: "number",
        key: "number",
        width: 100,
      },
      {
        title: "流转数量累积",
        dataIndex: "sumTransferNumberList",
        key: "sumTransferNumberList",
        render: sumTransferNumberRender,
        width: 120,
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
      {
        title: "操作",
        dataIndex: "processList",
        key: "processList",
        render: (data: any, record: any, index: number) => {
          // 这里后面要

          return (
            <>
              <Button
                type="primary"
                size="small"
                style={{ marginRight: 10 }}
                onClick={() => checkProcess(record?.partNumber)}
              >
                查看工艺
              </Button>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  setIssueModalOpen(true);
                  setIssueID(record?.id);
                }}
              >
                下发
              </Button>
            </>
          );
        },
        width: 180,
        fixed: "right",
      },
    ],
  };
};

export { formConfig, tableConfig };
