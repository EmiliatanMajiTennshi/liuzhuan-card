import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { Button, DatePicker, Input, Select } from "antd";
import { RuleObject } from "antd/es/form";

import { insertFurnaceChange } from "@/api";
import { emptyRenderCustomPlaceHolder } from "@/utils/tableRender";
import {
  SUCCESS_CODE,
  UPDATE_FAILED,
  UPDATE_SUCCESS,
} from "@/constants/constants";
import dayjs from "dayjs";
import { formatTime } from "@/utils";
const formConfig: (form?: any) => IFormConfig = (form) => {
  return {
    formExtend: true,
    formItems: ({ options, setOptions }) => {
      // if (!options.heatTreatmentFurnacePlatforms) {
      //   setOptions({
      //     ...options,
      //     heatTreatmentFurnacePlatforms: [{}],
      //   });
      //   getHeatTreatmentFurnacePlatformsList().then((res) => {
      //     // 热处理炉台号
      //     if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
      //       const platformsOptions = res?.data?.data?.map(
      //         (item: { id: string; name: string }) => ({
      //           value: item?.name,
      //           label: item?.name,
      //         })
      //       );
      //       setOptions({
      //         ...options,
      //         heatTreatmentFurnacePlatforms: platformsOptions,
      //       });
      //     }
      //   });
      // }
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
        // {
        //   key: "heatTreatmentFurnacePlatform",
        //   name: "热处理炉台号",
        //   children: (
        //     <Select
        //       allowClear
        //       options={options?.heatTreatmentFurnacePlatforms || []}
        //     ></Select>
        //   ),
        //   rules: [],
        // },

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
  const { setRefreshFlag, tableOptions, message } = props;
  // 获取炉台
  const furnaceOptionsApi = "getHeatTreatmentFurnacePlatformsList";
  return {
    rowKey: "transferCardCode", // 唯一标识
    api: "queryFurnaceChangeNew",
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
        width: 260,
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
        width: 100,
      },
      {
        title: "流转时间",
        dataIndex: "transferTime",
        key: "transferTime",
        width: 100,
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
        title: "单位",
        dataIndex: "unit",
        key: "unit",
        width: 60,
      },
      {
        title: "派工数量",
        dataIndex: "dispatchWorkNumber",
        key: "dispatchWorkNumber",
        width: 110,
      },
      {
        title: "完工数量",
        dataIndex: "finishedNumber",
        key: "finishedNumber",
        render: (text) => emptyRenderCustomPlaceHolder(text, "0"),
        width: 120,
      },
      // {
      //   title: "炉台",
      //   dataIndex: "heatTreatmentFurnacePlatform",
      //   key: "heatTreatmentFurnacePlatform",
      //   fixed: "right",
      //   width: 130,
      // },
      {
        title: "炉台-变更",
        dataIndex: "heatTreatmentFurnacePlatform",
        key: "heatTreatmentFurnacePlatform",
        fixed: "right",
        width: 180,
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
              defaultValue={text}
              onChange={(e) => {
                record.heatTreatmentFurnacePlatform = e;
              }}
              allowClear
            ></Select>
          );
        },
      },
      {
        title: "优先顺序",
        key: "priority",
        dataIndex: "priority",
        width: 160,
        fixed: "right",
        render: (text, record) => (
          <Select
            style={{ width: "100%" }}
            title="优先顺序"
            options={Array.from({ length: 50 }, (item, index) => ({
              value: index + 1,
              label: index + 1,
            }))}
            defaultValue={text}
            onChange={(e) => {
              record.priority = e || "";
            }}
            placeholder="请选择优先顺序"
            allowClear
          />
        ),
      },
      {
        title: "流转时间",
        dataIndex: "transferTime",
        key: "transferTime",
        width: 160,
        fixed: "right",
        render: (text, record) => (
          <DatePicker
            showTime
            style={{ width: "100%" }}
            placeholder="请选择流转时间"
            onChange={(e) => {
              console.log(e, 1214);
              record.transferTime = e ? formatTime(e) : "";
            }}
            defaultValue={text ? dayjs(text) : undefined}
            allowClear
          ></DatePicker>
        ),
      },

      {
        title: "操作",
        dataIndex: "operate",
        key: "operate",
        fixed: "right",
        width: 80,
        render: (text, record) => {
          return (
            <Button
              type="primary"
              size="small"
              onClick={() => {
                console.log(record, 12414);

                insertFurnaceChange({
                  transferCardCode: record?.transferCardCode,
                  heatTreatmentFurnacePlatform:
                    record?.heatTreatmentFurnacePlatform,
                  priority: record?.priority || "",
                  transferTime: record?.transferTime || "",
                  // createTime: record?.createTime,
                  // id: record?.id,
                  // name: record?.furnaceChange,
                }).then((res) => {
                  if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
                    message.success(
                      `炉台 ${res?.data?.data || UPDATE_SUCCESS}`
                    );
                    setRefreshFlag((flag) => !flag);
                  } else {
                    message.error(` ${res?.data?.data || UPDATE_FAILED}`);
                  }
                });
                // updateFTransferCardInfoByCardId({
                //   transferCardCode: record?.transferCardCode,
                //   priority: record?.priority || "",
                //   transferTime: record?.transferTime || "",
                // }).then((res) => {
                //   if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
                //     message.success(
                //       `流转时间 ${res?.data?.data || UPDATE_SUCCESS}`
                //     );
                //     setRefreshFlag((flag) => !flag);
                //   } else {
                //     message.error(
                //       `流转时间 ${res?.data?.data || UPDATE_FAILED}`
                //     );
                //   }
                // });
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
