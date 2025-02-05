import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import { CustomInput } from "@/components/CustomInput";
import { DatePicker, Input, Select } from "antd";
import { RuleObject } from "antd/es/form";

const formConfig: IFormConfig = {
  formExtend: true,
  formItems: [
    {
      key: "orderid",
      name: "生产订单条码",
      children: <CustomInput allowScanner></CustomInput>,
      rules: [],
    },
    {
      key: "itmid",
      name: "料号",
      children: <CustomInput></CustomInput>,
      rules: [],
    },
    {
      key: "flowCardNumber",
      name: "流转卡编号",
      children: <CustomInput allowScanner></CustomInput>,
      rules: [],
    },
    {
      key: "tracingCode",
      name: "追溯条码",
      children: <CustomInput></CustomInput>,
      rules: [],
    },
    {
      key: "format",
      name: "规格",
      children: <CustomInput></CustomInput>,
      rules: [],
    },
    {
      key: "goodsname",
      name: "品名",
      children: <CustomInput></CustomInput>,
      rules: [],
    },
    {
      key: "createTimeStart",
      name: "创建时间开始",
      children: <DatePicker style={{ width: "100%" }}></DatePicker>,
      rules: [
        (form: any) => {
          const createTimeStart = form.getFieldValue("createTimeStart");
          const createTimeEnd = form.getFieldValue("createTimeEnd");

          // 该值用来防止死循环
          const lastCreateTimeStart = sessionStorage.getItem(
            "lastCreateTimeStart"
          );

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
          if (
            createTimeStart &&
            createTimeEnd &&
            createTimeStart.$d.toString() !== lastCreateTimeStart
          ) {
            sessionStorage.setItem("lastCreateTimeStart", createTimeStart.$d);
            form?.validateFields(["createTimeEnd"]);
          }

          return undefined as unknown as RuleObject;
        },
      ],
    },
    {
      key: "createTimeEnd",
      name: "创建时间结束",
      children: <DatePicker style={{ width: "100%" }}></DatePicker>,
      rules: [
        (form: any) => {
          const createTimeStart = form.getFieldValue("createTimeStart");
          const createTimeEnd = form.getFieldValue("createTimeEnd");
          const lastCreateTimeEnd = sessionStorage.getItem("lastCreateTimeEnd");

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
          if (
            createTimeEnd &&
            createTimeStart &&
            createTimeEnd.$d.toString() !== lastCreateTimeEnd
          ) {
            sessionStorage.setItem("lastCreateTimeEnd", createTimeEnd.$d);
            form?.validateFields(["createTimeStart"]);
          }

          return undefined as unknown as RuleObject;
        },
      ],
    },
    {
      key: "type",
      name: "类型",
      children: (
        <Select
          options={[
            { value: "zizhi", label: "自制" },
            { value: "waixie", label: "外协" },
            { value: "waigou", label: "外购" },
            { value: "wujin", label: "五金" },
            { value: "budan", label: "补单" },
            { value: "pandianlingjian", label: "盘点零件" },
          ]}
        ></Select>
      ),
      rules: [],
    },
    {
      key: "flowCardType",
      name: "流转卡类型",
      children: (
        <Select
          options={[
            { value: "semiFinished", label: "半品" },
            { value: "finished", label: "成品" },
          ]}
        ></Select>
      ),
      rules: [],
    },
    {
      key: "furnaceNumber",
      name: "热处理炉台号",
      children: (
        <Select
          options={[
            { value: "semiFinished", label: "半品" },
            { value: "finished", label: "成品" },
          ]}
        ></Select>
      ),
      rules: [],
    },
    {
      key: "finishStatus",
      name: "完工状态",
      children: (
        <Select
          options={[
            { value: "finished", label: "完工" },
            { value: "unfinished", label: "未完工" },
            { value: "offGrade", label: "不合格报表" },
          ]}
        ></Select>
      ),
      rules: [],
    },
    {
      key: "completeTimeStart",
      name: "完成时间开始",
      children: <DatePicker style={{ width: "100%" }}></DatePicker>,
      rules: [
        (form: any) => {
          const completeTimeStart = form.getFieldValue("completeTimeStart");
          const completeTimeEnd = form.getFieldValue("completeTimeEnd");

          // 该值用来防止死循环
          const lastCompleteTimeStart = sessionStorage.getItem(
            "lastCompleteTimeStart"
          );

          if (
            completeTimeEnd &&
            completeTimeStart &&
            completeTimeEnd < completeTimeStart
          ) {
            return {
              validator: true,
              message: "开始日期不能晚于结束",
            } as unknown as RuleObject;
          }
          if (
            completeTimeStart &&
            completeTimeEnd &&
            completeTimeStart.$d.toString() !== lastCompleteTimeStart
          ) {
            sessionStorage.setItem(
              "lastCompleteTimeStart",
              completeTimeStart.$d
            );
            form?.validateFields(["completeTimeEnd"]);
          }

          return undefined as unknown as RuleObject;
        },
      ],
    },
    {
      key: "completeTimeEnd",
      name: "完成时间结束",
      children: <DatePicker style={{ width: "100%" }}></DatePicker>,
      rules: [
        (form: any) => {
          const completeTimeStart = form.getFieldValue("completeTimeStart");
          const completeTimeEnd = form.getFieldValue("completeTimeEnd");
          const lastCompleteTimeEnd = sessionStorage.getItem(
            "lastCompleteTimeEnd"
          );

          if (
            completeTimeEnd &&
            completeTimeStart &&
            completeTimeEnd < completeTimeStart
          ) {
            return {
              validator: true,
              message: "结束日期不能早于开始",
            } as unknown as RuleObject;
          }
          if (
            completeTimeEnd &&
            completeTimeStart &&
            completeTimeEnd.$d.toString() !== lastCompleteTimeEnd
          ) {
            sessionStorage.setItem("lastCompleteTimeEnd", completeTimeEnd.$d);
            form?.validateFields(["completeTimeStart"]);
          }

          return undefined as unknown as RuleObject;
        },
      ],
    },
  ],
};

const tableConfig = {
  api: "getMenu",

  columns: [
    {
      title: "流转卡类型",
      dataIndex: "flowCardType",
      key: "flowCardType",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "流转卡编号",
      dataIndex: "flowCardNumber",
      key: "flowCardNumber",
    },
    {
      title: "追溯条码",
      dataIndex: "tracingCode",
      key: "tracingCode",
    },

    {
      title: "生产订单条码",
      dataIndex: "orderid",
      key: "orderid",
    },
    {
      title: "料号",
      dataIndex: "itmid",
      key: "itmid",
    },
    {
      title: "入库料号",
      dataIndex: "IncomingPartNumber",
      key: "IncomingPartNumber",
    },
    {
      title: "品名",
      dataIndex: "goodsname",
      key: "goodsname",
    },
    {
      title: "规格",
      dataIndex: "format",
      key: "format",
    },
    {
      title: "单位",
      dataIndex: "uomname",
      key: "uomname",
    },
    {
      title: "完成时间",
      dataIndex: "ljFinDate",
      key: "ljFinDate",
    },
    {
      title: "创建(流转)时间",
      dataIndex: "createTime",
      key: "createTime",
    },

    {
      title: "热处理炉台",
      dataIndex: "furnaceNumber",
      key: "furnaceNumber",
    },
    {
      title: "优先顺序",
      dataIndex: "priorityOrder",
      key: "priorityOrder",
    },
    {
      title: "生产数量总量",
      dataIndex: "totalProductionQuantity",
      key: "totalProductionQuantity",
    },
    {
      title: "流转数量累积",
      dataIndex: "sumcount",
      key: "sumcount",
    },
    {
      title: "流转桶数",
      dataIndex: "flowBuckets",
      key: "flowBuckets",
    },
    {
      title: "单桶流转数量",
      dataIndex: "singleBucketFlowVolume",
      key: "singleBucketFlowVolume",
    },
    {
      title: "当前工艺",
      dataIndex: "currentProcess",
      key: "currentProcess",
    },
    {
      title: "完工状态",
      dataIndex: "finishStatus",
      key: "finishStatus",
    },
    {
      title: "零件流转卡",
      dataIndex: "partFlowCard",
      key: "partFlowCard",
    },
  ],
};

export { formConfig, tableConfig };
