import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { Button, DatePicker, Input, Tag } from "antd";
import { RuleObject } from "antd/es/form";

import { kgArr } from "@/constants";
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
      // {
      //   key: "barCode",
      //   name: "订单号",
      //   children: <CustomInput></CustomInput>,
      //   rules: [],
      // },

      // {
      //   key: "partNumber",
      //   name: "零件料号",
      //   children: <CustomInput></CustomInput>,
      //   rules: [],
      // },

      {
        key: "name",
        name: "品名",
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
      {
        key: "spec",
        name: "规格",
        children: <CustomInput></CustomInput>,
        rules: [],
      },
      {
        key: "traceabilityNumber",
        name: "追溯单号",
        children: <CustomInput></CustomInput>,
        rules: [],
      },
    ],
    handleDate: true,
  };
};

const tableConfig: (props: ITableConfigProps) => ITableConfig = (props) => {
  const { setMultiDetailModalOpen, setIssueID } = props;
  return {
    rowKey: "id", // 唯一标识
    api: "queryMultiProcess",
    noPaging: true,
    disableFirstLoading: true,
    columns: [
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
        width: 160,
      },
      {
        title: "料号",
        dataIndex: "itmid",
        key: "itmid",
      },
      {
        title: "追溯单号",
        dataIndex: "traceabilityNumber",
        key: "traceabilityNumber",
      },
      {
        title: "数量",
        dataIndex: "productKg",
        key: "productKg",
      },
      {
        title: "流转数量",
        dataIndex: "transferNumber",
        key: "transferNumber",
      },

      {
        title: "品名",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "规格",
        dataIndex: "spec",
        key: "spec",
      },

      {
        title: "材质",
        dataIndex: "itmtdid",
        key: "itmtdid",
      },

      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        width: 180,
      },
      {
        title: "完成时间",
        dataIndex: "ljFinDate",
        key: "ljFinDate",
      },
      {
        title: "编辑",
        dataIndex: "edit",
        key: "edit",
        render: (data: any, record: any, index: number) => {
          console.log(record, 12412124);

          return (
            <>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  setMultiDetailModalOpen(true);
                  setIssueID({ transferCardCode: record?.transferCardCode });
                }}
              >
                编辑
              </Button>
            </>
          );
        },
      },
    ],
  };
};

export { formConfig, tableConfig };
