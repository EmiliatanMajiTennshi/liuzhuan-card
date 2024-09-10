import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { Button, ConfigProvider, DatePicker, Input, Select, Tag } from "antd";
import { RuleObject } from "antd/es/form";
import {
  FINISHED_CODE,
  SEMI_FINISHED_CODE,
  SUCCESS_CODE,
  kgArr,
} from "@/constants";
import { countProductType, getHeatTreatmentFurnacePlatformsList } from "@/api";
import { sumTransferNumberRender } from "@/utils/tableRender";

const formConfig: (form?: any) => IFormConfig = (form) => {
  return {
    formExtend: true,
    formItems: ({ options, setOptions }) => {
      if (!options.type) {
        setOptions({ ...options, type: [{}] });
        setOptions({ ...options, type: [{}] });
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
      if (!options.heatTreatmentFurnacePlatforms) {
        setOptions({
          ...options,
          heatTreatmentFurnacePlatforms: [{}],
        });

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
                { value: SEMI_FINISHED_CODE, label: "半品" },
                { value: FINISHED_CODE, label: "成品" },
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
                { value: 1, label: "完工" },
                { value: 0, label: "未完工" },
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
    handleDate: true,
  };
};

const tableConfig: (props: ITableConfigProps) => ITableConfig = (props) => {
  const { setIssueModalOpen, setIssueID, setPrintModalOpen } = props;
  return {
    rowKey: "id", // 唯一标识
    api: "queryTransferCard",
    queryFlowCardApi: "clickTransferCard",
    flowCardType: "flowCard",
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
        width: 180,
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
        title: "单桶流转数量",
        dataIndex: "singleNumber",
        key: "singleNumber",
        width: 110,
        render: (text, record) => {
          const isKg = kgArr.indexOf(record?.unit) !== -1;
          return isKg ? record?.transferKg : record?.transferPcs;
        },
      },
      {
        title: "当前工艺",
        dataIndex: "currentProcess",
        key: "currentProcess",
        width: 120,
      },
      {
        title: "完工状态",
        dataIndex: "completionStatus",
        key: "completionStatus",
        width: 80,
        fixed: "right",
        render: (text: number) => {
          if (text === 0) {
            return <Tag color="red">未完工</Tag>;
          }
          if (text === 1) {
            return <Tag color="green">完工</Tag>;
          }
          return text;
        },
      },
      {
        title: "操作",
        dataIndex: "processList",
        key: "processList",
        render: (data: any, record: any, index: number) => {
          // 这里后面要
          console.log(record);

          return (
            <>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  setIssueModalOpen(true);
                  setIssueID(record?.id);
                }}
              >
                编辑
              </Button>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#87d068",
                  },
                }}
              >
                <Button
                  type="primary"
                  size="small"
                  style={{ marginLeft: 10 }}
                  onClick={() => {
                    setPrintModalOpen(true);
                    setIssueID(record?.id);
                  }}
                  disabled={parseFloat(record?.printStatus) === 1}
                >
                  打印流转卡
                </Button>
              </ConfigProvider>
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
