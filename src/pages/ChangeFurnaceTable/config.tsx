import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { Button, DatePicker, Input, Select, message } from "antd";
import { RuleObject } from "antd/es/form";

import {
  changeFurnacePlatformById,
  getHeatTreatmentFurnacePlatformsList,
} from "@/api";
import { kgArr } from "@/constants";
import { sumTransferNumberRender } from "@/utils/tableRender";
import {
  DEFAULT_ORANGE,
  SUCCESS_CODE,
  UPDATE_FAILED,
  UPDATE_SUCCESS,
} from "@/constants/constants";

const formConfig: (form?: any) => IFormConfig = (form) => {
  return {
    formItems: ({ options, setOptions }) => {
      if (!options.heatTreatmentFurnacePlatforms) {
        getHeatTreatmentFurnacePlatformsList().then((res) => {
          // 热处理炉台号
          if (res?.data?.code === SUCCESS_CODE) {
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
      ];
    },
    handleDate: true,
  };
};

const tableConfig: (props: ITableConfigProps) => ITableConfig = (props) => {
  const { setRefreshFlag, tableOptions } = props;
  console.log(12313);
  // 获取炉台
  const furnaceOptionsApi = "getHeatTreatmentFurnacePlatformsList";
  return {
    rowKey: "id", // 唯一标识
    api: "queryFurnaceChange",
    optionList: [furnaceOptionsApi],
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
        title: "流转卡编号",
        dataIndex: "transferCardCode",
        key: "transferCardCode",
        width: 240,
      },

      {
        title: "工艺",
        dataIndex: "processList",
        key: "processList",
        width: 100,
        render: (list: any[]) => {
          return (
            <span
              style={{
                fontWeight: "bold",
                color: DEFAULT_ORANGE,
                fontSize: 16,
              }}
            >
              {list[0]?.processName}
            </span>
          );
        },
      },
      {
        title: "生产订单条码",
        dataIndex: "barCode",
        key: "barCode",
        width: 180,
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

      {
        title: "字样",
        dataIndex: "trademark",
        key: "trademark",
        width: 150,
      },
      {
        title: "下发(流转)时间",
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
        title: "派工数量",
        dataIndex: "production",
        key: "production",
        width: 110,
        render: (text, record) => {
          const isKg = kgArr.indexOf(record?.unit) !== -1;
          return isKg ? record?.productionKg : record?.productionPcs;
        },
      },
      {
        title: "完工数量",
        dataIndex: "sumTransferNumberList",
        key: "sumTransferNumberList",
        render: sumTransferNumberRender,
        width: 120,
      },
      {
        title: "炉台",
        dataIndex: "heatTreatmentFurnacePlatform",
        key: "heatTreatmentFurnacePlatform",
        fixed: "right",
        width: 120,
      },
      {
        title: "炉台-变更",
        dataIndex: "furnaceChange",
        key: "furnaceChange",
        fixed: "right",
        width: 150,
        render: (text, record) => {
          return (
            <Select
              style={{ width: "100%" }}
              placeholder="请选择炉台"
              options={tableOptions?.[furnaceOptionsApi]?.map(
                (item: { id: string; name: string }) => ({
                  value: item?.name,
                  label: item?.name,
                })
              )}
              onSelect={(e) => {
                record.furnaceChange = e;
              }}
            ></Select>
          );
        },
      },

      {
        title: "操作",
        dataIndex: "operate",
        key: "operate",
        fixed: "right",
        width: 120,
        render: (text, record) => {
          return (
            <Button
              type="primary"
              size="small"
              onClick={() => {
                changeFurnacePlatformById({
                  id: record?.id,
                  name: record?.furnaceChange,
                }).then((res) => {
                  if (res?.data?.code === SUCCESS_CODE) {
                    message.success(res?.data?.data || UPDATE_SUCCESS);
                    setRefreshFlag((flag) => !flag);
                  } else {
                    message.error(res?.data?.data || UPDATE_FAILED);
                  }
                });
              }}
            >
              变更
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
