import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { Button, DatePicker, Flex, Input, Select } from "antd";
import { RuleObject } from "antd/es/form";

import { formatDate } from "@/utils";
import { countProductType } from "@/api";
import { FINISHED_CODE, SEMI_FINISHED_CODE, SUCCESS_CODE } from "@/constants";

const formConfig: (form?: any) => IFormConfig = (form) => {
  return {
    name: "ReworkTransferCard",
    formExtend: true,
    formItems: ({ options, setOptions }) => {
      if (!options.type) {
        countProductType().then((res) => {
          //   零件类型;
          if (res?.data?.code === SUCCESS_CODE) {
            const typeOptions = res?.data?.data?.map((item: string) => ({
              value: item,
              label: item,
            }));
            setOptions({ ...options, type: typeOptions });
          }
        });
      }
      return [
        {
          key: "transferCardCode",
          name: "流转卡编号",
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
          key: "reworkTransferCardCode",
          name: "返工卡编号",
          children: <Input></Input>,
          rules: [],
        },
        {
          key: "traceabilityNumber",
          name: "追溯条码",
          children: <Input></Input>,
          rules: [],
        },

        {
          key: "barCode",
          name: "订单号",
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
          key: "transferCardType",
          name: "流转卡类型",
          children: (
            <Select
              allowClear
              options={[
                { value: SEMI_FINISHED_CODE, label: "半品" },
                { value: FINISHED_CODE, label: "成品" },
              ]}
            ></Select>
          ),
          rules: [],
        },
        {
          key: "type",
          name: "类型",
          children: <Select allowClear options={options?.type || []}></Select>,
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
                sessionStorage.setItem(
                  "lastCreateTimeStart",
                  createTimeStart.$d
                );
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
              const lastCreateTimeEnd =
                sessionStorage.getItem("lastCreateTimeEnd");

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
      ];
    },
    handleDate: true,
  };
};

const tableConfig: (props: ITableConfigProps) => ITableConfig = (props) => {
  const { setIssueModalOpen, setIssueID, setPrintModalOpen } = props;
  return {
    rowKey: "id", // 唯一标识
    api: "queryRework",
    flowCardType: "rework",
    queryFlowCardApi: "queryReworkInfoById",
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
        title: "返工卡编号",
        dataIndex: "reworkTransferCardCode",
        key: "reworkTransferCardCode",
        width: 240,
      },
      {
        title: "追溯条码",
        dataIndex: "traceabilityNumber",
        key: "traceabilityNumber",
        width: 110,
      },
      {
        title: "流转卡编号",
        dataIndex: "transferCardCode",
        key: "transferCardCode",
        width: 240,
      },
      {
        title: "料号",
        dataIndex: "partNumber",
        key: "partNumber",
        width: 130,
      },

      {
        title: "品名",
        dataIndex: "name",
        key: "name",
        width: 150,
      },
      {
        title: "规格",
        dataIndex: "spec",
        key: "spec",
        width: 100,
      },

      {
        title: "返工数量",
        dataIndex: "reworkQuantity",
        key: "reworkQuantity",
        width: 100,
      },
      {
        title: "返工单位",
        dataIndex: "reworkUnit",
        key: "reworkUnit",
        width: 100,
      },

      //     title: "入库料号",
      //     dataIndex: "storePartNumber",
      //     key: "storePartNumber",
      //     width: 130,
      //   },

      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        width: 160,
      },
      {
        title: "操作",
        dataIndex: "operate",
        key: "operate",
        width: 180,
        fixed: "right",
        render: (text, record) => {
          return (
            <div>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  setIssueModalOpen(true);
                  setIssueID(record?.id);
                }}
              >
                查看
              </Button>
              <Button
                type="primary"
                size="small"
                style={{ marginLeft: "10px" }}
                onClick={() => {
                  setPrintModalOpen(true);
                  setIssueID(record?.id);
                }}
              >
                打印
              </Button>
            </div>
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
