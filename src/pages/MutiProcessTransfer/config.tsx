import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { Button, DatePicker, Input, Tag } from "antd";
import { RuleObject } from "antd/es/form";

import { kgArr } from "@/constants";

const formConfig: (form?: any) => IFormConfig = (form) => {
  return {
    formExtend: true,
    formItems: [
      {
        key: "CardID",
        name: "流转卡编号",
        children: <Input></Input>,
        rules: [],
      },
      // {
      //   key: "barCode",
      //   name: "订单号",
      //   children: <Input></Input>,
      //   rules: [],
      // },

      // {
      //   key: "partNumber",
      //   name: "零件料号",
      //   children: <Input></Input>,
      //   rules: [],
      // },

      {
        key: "SMAKTX",
        name: "品名",
        children: <Input></Input>,
        rules: [],
      },

      {
        key: "time1",
        name: "完成时间开始",
        children: (
          <DatePicker
            style={{ width: "100%" }}
            onChange={() => {
              if (form) {
                form.validateFields(["time2"]);
              }
            }}
          ></DatePicker>
        ),
        rules: [
          (form: any) => {
            const time1 = form.getFieldValue("time1");
            const time2 = form.getFieldValue("time2");

            if (time2 && time1 && time2 < time1) {
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
        key: "time2",
        name: "完成时间结束",
        children: (
          <DatePicker
            style={{ width: "100%" }}
            onChange={() => {
              if (form) {
                form.validateFields(["time1"]);
              }
            }}
          ></DatePicker>
        ),
        rules: [
          (form: any) => {
            const time1 = form.getFieldValue("time1");
            const time2 = form.getFieldValue("time2");

            if (time2 && time1 && time2 < time1) {
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
        key: "Format",
        name: "规格",
        children: <Input></Input>,
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
    api: "getMultiCardList",
    columns: [
      {
        title: "流转卡编号",
        dataIndex: "CardID",
        key: "CardID",
        width: 260,
      },
      {
        title: "订单号",
        dataIndex: "orderno",
        key: "orderno",
      },
      {
        title: "料号",
        dataIndex: "Matnr",
        key: "Matnr",
      },
      {
        title: "数量",
        dataIndex: "Num",
        key: "Num",
      },
      {
        title: "流转数量",
        dataIndex: "LZNum",
        key: "LZNum",
      },

      {
        title: "品名",
        dataIndex: "SMAKTX",
        key: "SMAKTX",
      },
      {
        title: "规格",
        dataIndex: "Format",
        key: "Format",
      },

      {
        title: "材质",
        dataIndex: "Texture",
        key: "Texture",
      },

      {
        title: "创建时间",
        dataIndex: "CRTM",
        key: "CRTM",
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
                  setIssueID({ CardID: record?.CardID });
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
