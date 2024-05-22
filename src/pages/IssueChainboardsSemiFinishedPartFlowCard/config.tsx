import { DatePicker, Input, Select } from "antd";
import { RuleObject } from "antd/es/form";

const formConfig = {
  api: "",
  formItems: [
    {
      key: "partType",
      name: "零件类型",
      children: (
        <Select
          options={[
            { value: "standardParts", label: "标准零件" },
            { value: "nonStandardParts", label: "非标零件" },
          ]}
        ></Select>
      ),
      rules: [],
    },
    {
      key: "productionOrderCode",
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
      key: "spec",
      name: "规格",
      children: <Input></Input>,
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
      title: "零件类型",
      dataIndex: "partType",
    },

    {
      title: "生产订单条码",
      dataIndex: "productionOrderCode",
    },
    {
      title: "零件料号",
      dataIndex: "partNumber",
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
      title: "商标",
      dataIndex: "brand",
    },
    {
      title: "完成时间",
      dataIndex: "finishTime",
    },
    {
      title: "单位",
      dataIndex: "unit",
    },
    {
      title: "数量",
      dataIndex: "quantity",
    },
    {
      title: "流转数量累积",
      dataIndex: "cumFlowVolume",
    },
    {
      title: "第一道工艺",
      dataIndex: "firstProcess",
    },
    {
      title: "第二道工艺",
      dataIndex: "firstProcess",
    },
    {
      title: "半品零件流转卡",
      dataIndex: "semiFinishedPartFlowCard",
    },
  ],
};

export { formConfig, tableConfig };
