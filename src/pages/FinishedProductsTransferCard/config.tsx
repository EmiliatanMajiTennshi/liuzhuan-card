import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { Button, DatePicker, Select } from "antd";
import { RuleObject } from "antd/es/form";

// import { FINISHED_CODE, SEMI_FINISHED_CODE } from "@/constants";

import { CustomInput } from "@/components/CustomInput";

const formConfig: (form: any) => IFormConfig = (form) => {
  return {
    formExtend: true,
    formItems: [
      {
        key: "type",
        name: "零件类型",
        children: (
          <Select
            allowClear
            options={[
              { value: "标准零件", label: "标准零件" },
              { value: "非标零件", label: "非标零件" },
            ]}
          ></Select>
        ),
        rules: [],
      },
      {
        key: "barCode",
        name: "生产订单条码",
        children: <CustomInput allowScanner></CustomInput>,
        rules: [],
      },
      {
        key: "partNumber",
        name: "零件料号",
        children: <CustomInput></CustomInput>,
        rules: [],
      },
      {
        key: "name2",
        name: "品名",
        children: <CustomInput></CustomInput>,
        rules: [],
      },
      // {
      //   key: "ishand",
      //   name: "零件类型",
      //   children: (
      //     <Select
      //       allowClear
      //       options={[
      //         { value: "盘点", label: "盘点" },
      //         { value: "", label: "全部" },
      //       ]}
      //     ></Select>
      //   ),
      //   rules: [],
      // },
      // {
      //   key: "category",
      //   name: "类别",
      //   children: (
      //     <Select
      //       allowClear
      //       options={[
      //         { value: SEMI_FINISHED_CODE, label: "半成品" },
      //         { value: FINISHED_CODE, label: "成品" },
      //       ]}
      //     ></Select>
      //   ),
      //   rules: [],
      // },
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
  const { setIssueModalOpen, setIssueID } = props;
  return {
    api: "getFinishedProducts",
    queryFlowCardApi: "queryfinishedProductsByOI",
    flowCardType: "finished",
    rowKey: "id",
    disableFirstLoading: true,
    noPaging: true,
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
        width: 150,
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
        width: 60,
      },
      {
        title: "数量",
        dataIndex: "productionNumber",
        key: "productionNumber",
        width: 100,
        // render: (text, record) => {
        //   return kgArr.indexOf(record?.unit) !== -1
        //     ? record?.productionKg
        //     : record?.productionPcs;
        // },
      },
      {
        title: "流转数量累积",
        dataIndex: "sumTransferNumber",
        key: "sumTransferNumber",
        // render: (text, record) => {
        //   return kgArr.indexOf(record?.unit) !== -1
        //     ? record?.transferKg
        //     : record?.transferPcs;
        // },
        width: 100,
      },
      // {
      //   title: "第一道工艺",
      //   dataIndex: "process1",
      //   key: "process1",

      //   width: 100,
      // },
      // {
      //   title: "第二道工艺",
      //   dataIndex: "process2",
      //   key: "process2",

      //   width: 100,
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
          // 这里后面要

          return (
            <>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  setIssueModalOpen(true);
                  setIssueID({
                    orderid: record?.barCode,
                    itmid: record?.partNumber,
                  });
                }}
              >
                下发
              </Button>
            </>
          );
        },
        width: 80,
        fixed: "right",
      },
    ],
  };
};

export { formConfig, tableConfig };
