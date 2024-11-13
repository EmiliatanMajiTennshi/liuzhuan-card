import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { App, Button, DatePicker, Input, Select, Tag } from "antd";
import { RuleObject } from "antd/es/form";
import {
  getHeatTreatmentFurnacePlatformsList,
  updateHeatTreatmentStatus,
} from "@/api";
import { ERROR_MESSAGE, SUCCESS_CODE, kgArr } from "@/constants";
import { sumTransferNumberRender } from "@/utils/tableRender";
import { message } from "@/utils";

const formConfig: (form?: any) => IFormConfig = (form) => {
  return {
    formExtend: true,
    formItems: ({ options, setOptions }) => {
      if (!options.heatTreatmentFurnacePlatforms) {
        setOptions({
          ...options,
          heatTreatmentFurnacePlatforms: [{}],
        });
        getHeatTreatmentFurnacePlatformsList().then((res) => {
          // 热处理炉台号
          if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
            const platformsOptions = res?.data?.data?.map(
              (item: { id: string; name: string }) => ({
                value: item?.name,
                label: item?.name,
              })
            );
            setOptions({
              ...options,
              heatTreatmentFurnacePlatforms: platformsOptions,
            });
          }
        });
      }
      return [
        {
          key: "barCode",
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
          key: "specs",
          name: "规格",
          children: <Input></Input>,
          rules: [],
        },
        {
          key: "transferCardCode",
          name: "流转卡编号",
          children: <Input></Input>,
          rules: [],
        },

        {
          key: "name",
          name: "品名",
          children: <Input></Input>,
          rules: [],
        },
        {
          key: "heatTreatmentFurnacePlatform",
          name: "热处理炉台号",
          children: (
            <Select
              allowClear
              options={options?.heatTreatmentFurnacePlatforms || []}
            ></Select>
          ),
          rules: [],
        },

        {
          key: "createTimeStart",
          name: "下发时间开始",
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
          name: "下发时间结束",
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
        {
          key: "heatTreatmentDelivery",
          name: "配送状态",
          children: (
            <Select
              allowClear
              options={[
                { value: "1", label: "完成" },
                { value: "0", label: "未完成" },
              ]}
            ></Select>
          ),
          rules: [],
        },
      ];
    },
    handleDate: true,
  };
};

const tableConfig: (props: ITableConfigProps) => ITableConfig = (props) => {
  const { setRefreshFlag } = props;
  return {
    rowKey: "id", // 唯一标识
    api: "queryHeatTreatment",

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
        title: "热处理炉台",
        dataIndex: "heatTreatmentFurnacePlatform",
        key: "heatTreatmentFurnacePlatform",
        width: 150,
      },
      {
        title: "流转卡编号",
        dataIndex: "transferCardCode",
        key: "transferCardCode",
        width: 240,
      },
      {
        title: "生产订单条码",
        dataIndex: "barCode",
        key: "barCode",
        width: 180,
      },

      {
        title: "入库料号",
        dataIndex: "partNumber",
        key: "partNumber",
        width: 130,
      },

      {
        title: "品名",
        dataIndex: "name",
        key: "name",
        width: 180,
      },
      {
        title: "规格",
        dataIndex: "specs",
        key: "specs",
        width: 100,
      },
      {
        title: "材质",
        dataIndex: "material",
        key: "material",
        width: 100,
      },
      {
        title: "表面处理",
        dataIndex: "surfaceTreatment",
        key: "surfaceTreatment",
        width: 100,
      },

      //     title: "入库料号",
      //     dataIndex: "storePartNumber",
      //     key: "storePartNumber",
      //     width: 130,
      //   },
      {
        title: "字样",
        dataIndex: "trademark",
        key: "trademark",
        width: 150,
      },
      {
        title: "下发(配送)时间",
        dataIndex: "createTime",
        key: "createTime",
        width: 160,
      },
      {
        title: "单位",
        dataIndex: "unit",
        key: "unit",
        width: 100,
      },
      {
        title: "生产数量总量",
        dataIndex: "production",
        key: "production",
        width: 110,
        render: (text, record) => {
          const isKg = kgArr.indexOf(record?.unit) !== -1;
          return isKg ? record?.productionKg : record?.productionPcs;
        },
      },
      {
        title: "流转数量累积",
        dataIndex: "sumTransferNumberList",
        key: "sumTransferNumberList",
        render: sumTransferNumberRender,
        width: 120,
      },

      {
        title: "流转桶数",
        dataIndex: "barrelCount",
        key: "barrelCount",
        width: 120,
        render: (barrelCount: any) => {
          return barrelCount?.countBarrel;
        },
      },
      {
        title: "单桶数量",
        dataIndex: "singleNumber",
        key: "singleNumber",
        width: 110,
        render: (text, record) => {
          const isKg = kgArr.indexOf(record?.unit) !== -1;
          return isKg ? record?.transferKg : record?.transferPcs;
        },
      },
      {
        title: "配送状态",
        dataIndex: "heatTreatmentDelivery",
        key: "heatTreatmentDelivery",
        width: 80,
        fixed: "right",
        render: (text: string) => {
          if (text === "0") {
            return <Tag color="red">未完成</Tag>;
          }
          if (text === "1") {
            return <Tag color="green">完成</Tag>;
          }
          return text;
        },
      },
      {
        title: "确认配送",
        dataIndex: "confirmDelivery",
        key: "confirmDelivery",
        fixed: "right",
        width: 120,
        render: (text, record) => {
          return (
            <Button
              disabled={record?.heatTreatmentDelivery === "1"}
              type="primary"
              size="small"
              onClick={async () => {
                const res = await updateHeatTreatmentStatus({ id: record?.id });
                if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
                  message.success(res?.data?.data);
                  setRefreshFlag((flag) => !flag);
                } else {
                  message.error(res?.data?.msg || ERROR_MESSAGE);
                }
              }}
            >
              配送
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
function dayjs(): string {
  throw new Error("Function not implemented.");
}
