import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { Button, DatePicker, Input, Select } from "antd";
import { RuleObject } from "antd/es/form";
import { FINISHED_CODE, kgArr, SEMI_FINISHED_CODE } from "@/constants";
import { sumTransferNumberRender } from "@/utils/tableRender";
import { CustomInput } from "@/components/CustomInput";

const formConfig: (props?: any) => IFormConfig = ({ form }) => {
  return {
    formExtend: true,
    formItems: [
      {
        key: "department",
        name: "部门",
        children: <CustomInput allowScanner></CustomInput>,
        rules: [],
      },

      {
        key: "finishTimeStart",
        name: "交期开始",
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
        name: "交期结束",
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
    api: "queryStoreList",
    queryFlowCardApi: "queryStoreList",
    flowCardType: "common",
    columns: [
      {
        title: "部门",
        dataIndex: "transferCardCode",
        key: "transferCardCode",
        width: 100,
      },

      {
        title: "生产订单条码",
        dataIndex: "orderNo",
        key: "orderNo",
        width: 150,
      },
      {
        title: "零件料号",
        dataIndex: "partNumber",
        key: "partNumber",
        width: 120,
      },
      {
        title: "品名",
        dataIndex: "name",
        key: "name",
        width: 120,
      },
      {
        title: "规格",
        dataIndex: "spec",
        key: "spec",
        width: 100,
      },
      {
        title: "追溯单号",
        dataIndex: "traceabilityNumber",
        key: "traceabilityNumber",
        width: 100,
      },
      {
        title: "工艺名称",
        dataIndex: "processName",
        key: "processName",
        width: 100,
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        width: 160,
      },
      {
        title: "交期",
        dataIndex: "finishTime",
        key: "finishTime",
        width: 100,
      },
    ],
  };
};

export { formConfig, tableConfig };
