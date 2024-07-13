import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { Button, DatePicker, Input, Modal, Select } from "antd";
import { RuleObject } from "antd/es/form";
import { NavLink } from "react-router-dom";
import { sortBy } from "lodash";

const formConfig: (form?: any) => IFormConfig = (form) => {
  return {
    formItems: [
      // {
      //   key: "type",
      //   name: "零件类型",
      //   children: (
      //     <Select
      //       options={[
      //         { value: "标准", label: "标准零件" },
      //         { value: "非标", label: "非标零件" },
      //       ]}
      //     ></Select>
      //   ),
      //   rules: [],
      // },
      {
        key: "barCode",
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
        key: "specs",
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

const tableConfig: (props: ITableConfigProps) => ITableConfig = (props) => {
  const { setIssueModalOpen, setIssueID } = props;
  return {
    api: "queryHalfTransferCard",
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
        width: 100,
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
        width: 80,
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
        width: 100,
      },
      {
        title: "数量",
        dataIndex: "number",
        key: "number",
        width: 100,
      },
      {
        title: "流转数量累积",
        dataIndex: "sumTransferNumberList",
        key: "sumTransferNumberList",
        render: (data: string[]) => {
          return data.map((item) => item);
        },
        width: 120,
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
                style={{ marginRight: 10 }}
                onClick={async () => {
                  Modal.info({
                    title: "工艺详情",
                    footer: null,
                    width: 400,
                    closable: true,
                    icon: null,

                    content: (
                      <div>
                        {sortBy(data, "seq")?.map((item) => {
                          console.log(item, 12131);

                          return (
                            <p>{`第${item?.seq}道工艺：${item?.processName}`}</p>
                          );
                        })}
                      </div>
                    ),
                  });
                }}
              >
                查看工艺
              </Button>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  setIssueModalOpen(true);
                  setIssueID(record?.id);
                }}
              >
                下发
              </Button>
            </>
          );
        },
        width: 180,
        fixed: "right",
      },
    ],
  };
};

export { formConfig, tableConfig };
