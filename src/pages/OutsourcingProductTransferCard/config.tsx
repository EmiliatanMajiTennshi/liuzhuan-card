import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { Button, DatePicker, Input, Select } from "antd";
import { RuleObject } from "antd/es/form";

import { formatDate } from "@/utils";
import { FINISHED_CODE, SEMI_FINISHED_CODE } from "@/constants";

const formConfig: (form?: any) => IFormConfig = (form) => {
  return {
    formItems: [
      {
        key: "category",
        name: "分类",
        children: (
          <Select
            allowClear
            options={[
              { value: "2PO14", label: "外协件" },
              { value: "2PO012", label: "外购件" },
              { value: "2PO032", label: "五金" },
              { value: "240", label: "苏州采购" },
            ]}
          ></Select>
        ),
        rules: [],
      },
      {
        key: "type",
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
    api: "queryOutsourcingPurchasing",
    queryFlowCardApi: "queryFlowCardInfoByOrderNo",
    flowCardType: "outsourcing",
    columns: [
      {
        title: "分类",
        dataIndex: "category",
        key: "category",
        width: 100,
      },
      {
        title: "类型",
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
        title: "行号",
        dataIndex: "u9LineNo",
        key: "u9LineNo",
        width: 80,
      },
      {
        title: "品名",
        dataIndex: "name",
        key: "name",
        width: 100,
      },
      {
        title: "规格",
        dataIndex: "specs",
        key: "specs",
        width: 100,
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
      // {
      //   title: "流转数量累积",
      //   dataIndex: "sumTransferNumberList",
      //   key: "sumTransferNumberList",
      //   // render: (data: string[]) => {
      //   //   return data.map((item) => item);
      //   // },
      //   width: 120,
      // },
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
          return (
            <>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  console.log(record, 12313);

                  setIssueModalOpen(true);
                  setIssueID(record?.uid);
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
