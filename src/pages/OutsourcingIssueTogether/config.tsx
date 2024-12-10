import { queryPartNumberByU9Code } from "@/api";
import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { CustomInput } from "@/components/CustomInput";
import { ERROR_UNFINISHED_ISSUE_FINISHED, SUCCESS_CODE } from "@/constants";
import { message } from "@/utils";
import { Button, DatePicker, Input, Select } from "antd";
import { RuleObject } from "antd/es/form";

const formConfig: (form?: any) => IFormConfig = (form) => {
  return {
    formExtend: true,
    formItems: [
      {
        key: "type",
        name: "类型",
        children: (
          <Select
            allowClear
            options={[
              { value: "外协件", label: "外协件" },
              { value: "外购件", label: "外购件" },
              { value: "五金", label: "五金" },
              { value: "苏州采购", label: "苏州采购" },
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
  const { setIssueModalOpen, setIssueID, setFinishedParams } = props;
  return {
    api: "getOutsourcingPurchasing",
    queryFlowCardApi: "queryoutsourcingPurchasingByOI",
    flowCardType: "outsourcing",
    issuedFlowCardApi: "queryoutsourcingPurchasingByOI",
    // 下发成品
    needIssueFinished: true,
    defaultParam: { category: "半品" },
    columns: [
      {
        title: "分类",
        dataIndex: "category",
        key: "category",
        width: 80,
      },
      {
        title: "类型",
        dataIndex: "type",
        key: "type",
        width: 80,
      },

      {
        title: "零件类型",
        dataIndex: "type1",
        key: "type1",
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
        width: 60,
      },
      {
        title: "数量",
        dataIndex: "number",
        key: "number",
        width: 100,
      },
      {
        title: "流转数量累积",
        dataIndex: "transferNumber",
        key: "transferNumber",
        // render: sumTransferNumberRender,
        width: 120,
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
          console.log(record, 12412124);

          return (
            <>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  const type = record?.type;
                  const handleRes = (res: any) => {
                    setIssueModalOpen(true);
                    setIssueID({
                      orderid: record?.barCode,
                      itmid: record?.partNumber,
                      id: record?.id,
                    });
                    if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
                      if (res?.data?.data?.[0]?.barCode) {
                        setFinishedParams(res?.data?.data);
                      } else {
                        setFinishedParams([{ partNumber: "", barCode: "" }]);
                      }
                    } else {
                      setFinishedParams([{ partNumber: "", barCode: "" }]);
                      message.error(ERROR_UNFINISHED_ISSUE_FINISHED);
                    }
                  };
                  queryPartNumberByU9Code({ id: record?.id })
                    .then(handleRes)
                    .catch((err) =>
                      message.error(ERROR_UNFINISHED_ISSUE_FINISHED, err)
                    );
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
