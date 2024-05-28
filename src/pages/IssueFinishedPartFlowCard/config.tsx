import { DatePicker, Input, Select } from "antd";
import { RuleObject } from "antd/es/form";

const formConfig = {
  api: "",
  formItems: [
    {
      key: "type1",
      name: "零件类型",
      children: (
        <Select
          options={[
            { value: "标准", label: "标准零件" },
            { value: "非标", label: "非标零件" },
            { value: "盘点", label: "盘点零件" },
          ]}
        ></Select>
      ),
      rules: [],
    },
    {
      key: "orderid",
      name: "生产订单条码",
      children: <Input></Input>,
      rules: [],
    },
    {
      key: "itmid",
      name: "零件料号",
      children: <Input></Input>,
      rules: [],
    },
    {
      key: "format",
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
    {
      key: "goodsname",
      name: "品名",
      children: <Input></Input>,
      rules: [],
    },
  ],
};
const tableConfig = {
  columns: [
    {
      title: "零件类型",
      dataIndex: "type1",
      key: "type1",
    },

    {
      title: "生产订单条码",
      dataIndex: "orderid",
      key: "orderid",
    },
    {
      title: "零件料号",
      dataIndex: "itmid",
      key: "itmid",
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
      title: "商标",
      dataIndex: "Pcode",
      key: "Pcode",
    },
    {
      title: "完成时间",
      dataIndex: "ljFinDate",
      key: "ljFinDate",
    },
    {
      title: "单位",
      dataIndex: "uomname",
      key: "uomname",
    },
    {
      title: "数量",
      dataIndex: "supcount",
      key: "supcount",
    },
    {
      title: "流转数量累积",
      dataIndex: "sumcount",
      key: "sumcount",
    },

    {
      title: "成品零件流转卡",
      dataIndex: "semiFinishedPartFlowCard",
      key: "semiFinishedPartFlowCard",
    },
  ],
};
export { formConfig, tableConfig };
