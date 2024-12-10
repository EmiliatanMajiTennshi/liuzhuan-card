import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { Button, DatePicker, Input, message, Tag } from "antd";
import { RuleObject } from "antd/es/form";

import { ERROR_MESSAGE, kgArr, SUCCESS_CODE } from "@/constants";
import { updateCheckById } from "@/api";
import { getErrorMessage } from "@/utils";
import { CustomInput } from "@/components/CustomInput";

const formConfig: (form?: any) => IFormConfig = (form) => {
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
        key: "name",
        name: "品名",
        children: <CustomInput></CustomInput>,
        rules: [],
      },
      {
        key: "traceabilityNumber",
        name: "追溯单号",
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
  const { setRefreshFlag, setIssueModalOpen, setIssueID } = props;
  return {
    rowKey: "id", // 唯一标识
    api: "queryQualityInspectionNew",
    queryFlowCardApi: "queryTransferCardInfoByCardIdNew",
    flowCardType: "flowCard",
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
        title: "追溯单号",
        dataIndex: "traceabilityNumber",
        key: "traceabilityNumber",
        width: 110,
      },

      {
        title: "生产订单号",
        dataIndex: "barCode",
        key: "barCode",
        width: 160,
      },
      {
        title: "零件料号",
        dataIndex: "partNumber",
        key: "partNumber",
        width: 130,
      },

      {
        title: "行号",
        dataIndex: "lineNumber",
        key: "lineNumber",
        width: 80,
      },
      {
        title: "品名",
        dataIndex: "name",
        key: "name",
        width: 150,
      },

      {
        title: "规格",
        dataIndex: "specs",
        key: "specs",
        width: 120,
      },
      {
        title: "材质",
        dataIndex: "material",
        key: "material",
        width: 100,
      },

      {
        title: "下发时间",
        dataIndex: "createTime",
        key: "createTime",
        width: 160,
        render: (text) => text?.slice(0, 19),
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
        dataIndex: "orderNumber",
        key: "orderNumber",
        width: 110,
        // render: (text, record) => {
        //   const isKg = kgArr.indexOf(record?.unit) !== -1;
        //   return isKg ? record?.productionKg : record?.productionPcs;
        // },
      },

      {
        title: "流转数量累积",
        dataIndex: "transfer",
        key: "transfer",
        width: 120,
        // render: (data: any, record) => {
        //   const unit = record?.unit;
        //   if (kgArr.indexOf(unit) !== -1) {
        //     return data?.alreaySendNumKG;
        //   }
        //   return data?.alreaySendNumPCS;
        // },
      },

      {
        title: "流转桶数",
        dataIndex: "barrelNumber",
        key: "barrelNumber",
        width: 120,
      },
      {
        title: "单桶流转数量",
        dataIndex: "singleTransferNumber",
        key: "singleTransferNumber",
        width: 110,
        // render: (text, record) => {
        //   const isKg = kgArr.indexOf(record?.unit) !== -1;
        //   return isKg ? record?.transferKg : record?.transferPcs;
        // },
      },
      {
        title: "检验状态",
        dataIndex: "inspectionStatus",
        key: "inspectionStatus",
        width: 80,
        fixed: "right",
        render: (text) => (
          <Tag color={text === "已检" ? "green" : "red"}>{text}</Tag>
        ),
      },

      {
        title: "操作",
        dataIndex: "operate",
        key: "operate",
        width: 120,
        fixed: "right",
        render: (text, record) => {
          return (
            <Button
              type="primary"
              size="small"
              disabled={record?.inspectionStatus === "1"}
              onClick={() => {
                setIssueModalOpen(true);
                setIssueID({ transferCardCode: record?.transferCardCode });
              }}
            >
              检验确认
            </Button>
          );
        },
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
