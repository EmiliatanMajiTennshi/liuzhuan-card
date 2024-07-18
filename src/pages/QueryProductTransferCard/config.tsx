import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { Button, DatePicker, Input, Modal, Select } from "antd";
import { RuleObject } from "antd/es/form";
import { sortBy } from "lodash";
import { formatTime } from "@/utils";
import { kgArr } from "@/constants";
import { countProductType, getHeatTreatmentFurnacePlatformsList } from "@/api";

const formConfig: (form?: any) => IFormConfig = (form) => {
  return {
    formItems: ({ options, setOptions }) => {
      if (!options.type) {
        countProductType().then((res) => {
          //   零件类型;
          if (res?.data?.code === 20000) {
            const typeOptions = res?.data?.data?.map((item: string) => ({
              value: item,
              label: item,
            }));
            setOptions({ ...options, type: typeOptions });
          }
        });
      }
      if (!options.heatTreatmentFurnacePlatforms) {
        getHeatTreatmentFurnacePlatformsList().then((res) => {
          // 热处理炉台号
          if (res?.data?.code === 20000) {
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
          name: "零件料号",
          children: <Input></Input>,
          rules: [],
        },
        {
          key: "transfCardNo",
          name: "流转卡编号",
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
          key: "specs",
          name: "规格",
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
          key: "createTimeStart",
          name: "创建时间开始",
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
          name: "创建时间结束",
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
          key: "type",
          name: "零件类型",
          children: <Select allowClear options={options?.type || []}></Select>,
          rules: [],
        },
        {
          key: "transferCardType",
          name: "流转卡类型",
          children: (
            <Select
              allowClear
              options={[
                { value: "32", label: "半品" },
                { value: "31", label: "成品" },
              ]}
            ></Select>
          ),
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
          key: "completionStatus",
          name: "完工状态",
          children: (
            <Select
              allowClear
              options={[
                { value: 0, label: "完工" },
                { value: 1, label: "未完工" },
                // { value: 2, label: "不合格报表" },
              ]}
            ></Select>
          ),
          rules: [],
        },
        {
          key: "finishTimeStart",
          name: "完成时间开始",
          children: (
            <DatePicker
              style={{ width: "100%" }}
              onChange={() => {
                if (form) {
                  form.validateFields(["finishTimeEnd"]);
                }
              }}
            ></DatePicker>
          ),
          rules: [
            (form: any) => {
              const finishTimeStart = form.getFieldValue("finishTimeStart");
              const finishTimeEnd = form.getFieldValue("finishTimeEnd");

              if (
                finishTimeEnd &&
                finishTimeStart &&
                finishTimeEnd < finishTimeStart
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
          key: "finishTimeEnd",
          name: "完成时间结束",
          children: (
            <DatePicker
              style={{ width: "100%" }}
              onChange={() => {
                if (form) {
                  form.validateFields(["finishTimeStart"]);
                }
              }}
            ></DatePicker>
          ),
          rules: [
            (form: any) => {
              const finishTimeStart = form.getFieldValue("finishTimeStart");
              const finishTimeEnd = form.getFieldValue("finishTimeEnd");

              if (
                finishTimeEnd &&
                finishTimeStart &&
                finishTimeEnd < finishTimeStart
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
    handleData: (values: any) => {
      if (values?.finishTimeEnd) {
        const _tempTime = formatTime(values?.finishTimeEnd);
        values.finishTimeEnd = _tempTime;
      }
      if (values?.finishTimeStart) {
        const _tempTime = formatTime(values?.finishTimeStart);
        values.finishTimeStart = _tempTime;
      }
      if (values?.createTimeEnd) {
        const _tempTime = formatTime(values?.createTimeEnd);
        values.createTimeEnd = _tempTime;
      }
      if (values?.createTimeStart) {
        const _tempTime = formatTime(values?.createTimeStart);
        values.createTimeStart = _tempTime;
      }
      return values;
    },
  };
};

const tableConfig: (props: ITableConfigProps) => ITableConfig = (props) => {
  const { setIssueModalOpen, setIssueID } = props;
  return {
    api: "queryTransferCard",
    queryFlowCardApi: "queryFlowCardInfoById",
    flowCardType: "common",
    columns: [
      {
        title: "流转卡类型",
        dataIndex: "transferCardType",
        key: "transferCardType",
        width: 100,
      },
      {
        title: "零件类型",
        dataIndex: "type",
        key: "type",
        width: 100,
      },

      {
        title: "流转卡编号",
        dataIndex: "transfCardNo",
        key: "transfCardNo",
        width: 240,
      },
      {
        title: "追溯单号",
        dataIndex: "traceabilityNumber",
        key: "traceabilityNumber",
        width: 110,
      },
      {
        title: "生产订单条码",
        dataIndex: "barCode",
        key: "barCode",
        width: 160,
      },
      {
        title: "零件料号",
        dataIndex: "partNumber",
        key: "partNumber",
        width: 130,
      },
      {
        title: "入库料号",
        dataIndex: "storePartNumber",
        key: "storePartNumber",
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
        title: "单位",
        dataIndex: "unit",
        key: "unit",
        width: 100,
      },
      //   {
      //     title: "商标",
      //     dataIndex: "trademark",
      //     key: "trademark",
      //     width: 80,
      //   },
      {
        title: "完成时间",
        dataIndex: "finishTime",
        key: "finishTime",
        width: 160,
      },
      {
        title: "创建(流转)时间",
        dataIndex: "createTime",
        key: "createTime",
        width: 160,
      },
      {
        title: "热处理炉台",
        dataIndex: "heatTreatmentFurnacePlatform",
        key: "heatTreatmentFurnacePlatform",
        width: 120,
      },
      {
        title: "优先顺序",
        dataIndex: "priorityOrder",
        key: "priorityOrder",
        width: 120,
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
        render: (data: any[], record) => {
          const unit = record?.unit;
          if (kgArr.indexOf(unit) !== -1) {
            return data?.[0]?.sumTransferKg;
          }
          return data?.[0]?.sumTransferPcs;
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
