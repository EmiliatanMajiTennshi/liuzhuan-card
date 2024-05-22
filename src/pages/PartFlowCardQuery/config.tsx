import { DatePicker, Input, Select } from "antd";
import { RuleObject } from "antd/es/form";

const formConfig = {
  api: "",
  formItems: [
    {
      key: "productionOrderCode",
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
      key: "flowCardNumber",
      name: "流转卡编号",
      children: <Input></Input>,
      rules: [],
    },
    {
      key: "tracingCode",
      name: "追溯条码",
      children: <Input></Input>,
      rules: [],
    },
    {
      key: "spec",
      name: "规格",
      children: <Input></Input>,
      rules: [],
    },
    {
      key: "productName",
      name: "品名",
      children: <Input></Input>,
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
            form.validateFields(["createTimeEnd"]);
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
            form.validateFields(["createTimeStart"]);
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
            form.validateFields(["completeTimeEnd"]);
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
            form.validateFields(["completeTimeStart"]);
          }

          return undefined as unknown as RuleObject;
        },
      ],
    },
  ],
};

const tableConfig = {
  columns: [
    {
      title: "流转卡类型",
      dataIndex: "flowCardType",
    },
    {
      title: "类型",
      dataIndex: "type",
    },
    {
      title: "流转卡编号",
      dataIndex: "flowCardNumber",
    },
    {
      title: "追溯条码",
      dataIndex: "tracingCode",
    },

    {
      title: "生产订单条码",
      dataIndex: "productionOrderCode",
    },
    {
      title: "料号",
      dataIndex: "partNumber",
    },
    {
      title: "入库料号",
      dataIndex: "IncomingPartNumber",
    },
    {
      title: "品名",
      dataIndex: "productName",
    },
    {
      title: "规格",
      dataIndex: "spec",
    },
    {
      title: "单位",
      dataIndex: "unit",
    },
    {
      title: "完成时间",
      dataIndex: "finishTime",
    },
    {
      title: "创建(流转)时间",
      dataIndex: "createTime",
    },

    {
      title: "热处理炉台",
      dataIndex: "furnaceNumber",
    },
    {
      title: "优先顺序",
      dataIndex: "priorityOrder",
    },
    {
      title: "生产数量总量",
      dataIndex: "totalProductionQuantity",
    },
    {
      title: "流转数量累积",
      dataIndex: "cumFlowVolume",
    },
    {
      title: "流转桶数",
      dataIndex: "flowBuckets",
    },
    {
      title: "单桶流转数量",
      dataIndex: "singleBucketFlowVolume",
    },
    {
      title: "当前工艺",
      dataIndex: "currentProcess",
    },
    {
      title: "完工状态",
      dataIndex: "finishStatus",
    },
    {
      title: "零件流转卡",
      dataIndex: "partFlowCard",
    },
  ],
};

export { formConfig, tableConfig };
