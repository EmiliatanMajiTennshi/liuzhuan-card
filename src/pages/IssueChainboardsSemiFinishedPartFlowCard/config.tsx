import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import { Button, DatePicker, Input, Select } from "antd";
import { RuleObject } from "antd/es/form";
import { NavLink } from "react-router-dom";

const formConfig: (form?: any) => IFormConfig = (form) => {
  return {
    api: "getUserInfo",
    formItems: [
      {
        key: "type1",
        name: "零件类型",
        children: (
          <Select
            options={[
              { value: "标准", label: "标准零件" },
              { value: "非标", label: "非标零件" },
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
        children: (
          <DatePicker
            style={{ width: "100%" }}
            onChange={() => {
              if (form) {
                form.validateFields(["completeTimeEnd"]);
              }
            }}
          ></DatePicker>
        ),
        rules: [
          (form: any) => {
            const completeTimeStart = form.getFieldValue("completeTimeStart");
            const completeTimeEnd = form.getFieldValue("completeTimeEnd");

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
            return undefined as unknown as RuleObject;
          },
        ],
      },
      {
        key: "completeTimeEnd",
        name: "完成时间结束",
        children: (
          <DatePicker
            style={{ width: "100%" }}
            onChange={() => {
              if (form) {
                form.validateFields(["completeTimeStart"]);
              }
            }}
          ></DatePicker>
        ),
        rules: [
          (form: any) => {
            const completeTimeStart = form.getFieldValue("completeTimeStart");
            const completeTimeEnd = form.getFieldValue("completeTimeEnd");

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

            return undefined as unknown as RuleObject;
          },
        ],
      },
    ],
  };
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
      title: "第一道工艺",
      dataIndex: "processname1",
      key: "processname1",
    },
    {
      title: "第二道工艺",
      dataIndex: "processname2",
      key: "processname2",
    },
    {
      title: "半品零件流转卡",
      dataIndex: "semiFinishedPartFlowCard",
      key: "semiFinishedPartFlowCard",
      render: (text: any, record: any, index: number) => {
        // 这里后面要
        console.log(text, record, index);

        const handleClick = (_record: any) => {};
        return (
          <NavLink
            to="/production_process_flow_card_and_dispatch_list"
            state={{ record: record }}
          >
            <Button
              type="primary"
              size="small"
              onClick={() => handleClick(record)}
            >
              下发
            </Button>
          </NavLink>
        );
      },
    },
  ],
};

export { formConfig, tableConfig };
