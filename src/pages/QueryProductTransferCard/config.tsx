import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { Button, ConfigProvider, DatePicker, Input, Select, Tag } from "antd";
import { RuleObject } from "antd/es/form";
import { FINISHED_CODE, SEMI_FINISHED_CODE, SUCCESS_CODE } from "@/constants";
import { countProductType, getHeatTreatmentFurnacePlatformsList } from "@/api";

const formConfig: (form?: any) => IFormConfig = (form) => {
  return {
    span: 4,
    formExtend: true,

    formItems: ({ options, setOptions }) => {
      if (!options.type) {
        setOptions({ ...options, type: [{}] });
        setOptions({ ...options, type: [{}] });
        // countProductType().then((res) => {
        //   //   零件类型;
        //   if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
        //     const typeOptions = res?.data?.data?.map((item: string) => ({
        //       value: item,
        //       label: item,
        //     }));
        //     setOptions({ ...options, type: typeOptions });
        //   }
        // });
      }
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
          key: "transferCardCode",
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
          key: "spec",
          name: "规格",
          children: <Input></Input>,
          rules: [],
        },
        {
          key: "type",
          name: "零件类型",
          children: (
            <Select
              allowClear
              options={[
                { value: "自制", label: "自制" },
                { value: "外协", label: "外协" },
                { value: "外购", label: "外购" },
                { value: "五金", label: "五金" },
                { value: "苏州采购", label: "苏州采购" },
                { value: "补单", label: "补单" },
                { value: "盘点零件", label: "盘点零件" },
              ]}
            ></Select>
          ),
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
          key: "heatTreatmentFurnacePlatforms",
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
          key: "category",
          name: "流转卡类型",
          children: (
            <Select
              allowClear
              options={[
                { value: "半品", label: "半品" },
                { value: "成品", label: "成品" },
              ]}
            ></Select>
          ),
          rules: [],
        },
        {
          key: "name",
          name: "品名",
          children: <Input></Input>,
          rules: [],
        },

        {
          key: "finishStatus",
          name: "完工状态",
          children: (
            <Select
              allowClear
              options={[
                { value: "完工", label: "完工" },
                { value: "未完工", label: "未完工" },
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
        {
          key: "relation",
          name: "关联号",
          children: <Input></Input>,
          rules: [],
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
    api: "queryTransferCardNew",
    queryFlowCardApi: "queryTransferCardInfoByCardIdNew",
    flowCardType: "flowCard",
    disableFirstLoading: true,
    columns: [
      {
        title: "流转卡类型",
        dataIndex: "category",
        key: "category",
        width: 60,
      },
      {
        title: "零件类型",
        dataIndex: "type",
        key: "type",
        width: 60,
      },

      {
        title: "流转卡编号",
        dataIndex: "transferCardCode",
        key: "transferCardCode",
        width: 100,
      },
      {
        title: "追溯单号",
        dataIndex: "traceabilityNumber",
        key: "traceabilityNumber",
        width: 80,
      },

      {
        title: "关联号",
        dataIndex: "relation",
        key: "relation",
        width: 80,
      },

      {
        title: "字样",
        dataIndex: "trademark",
        key: "trademark",
        width: 60,
      },
      {
        title: "生产订单条码",
        dataIndex: "orderid",
        key: "orderid",
        width: 100,
      },
      {
        title: "入库料号",
        dataIndex: "itmid",
        key: "itmid",
        width: 100,
      },
      {
        title: "品名",
        dataIndex: "name",
        key: "name",
        width: 80,
      },
      {
        title: "规格",
        dataIndex: "spec",
        key: "spec",
        width: 80,
      },
      {
        title: "单位",
        dataIndex: "unit",
        key: "unit",
        width: 60,
      },
      //   {
      //     title: "商标",
      //     dataIndex: "trademark",
      //     key: "trademark",
      //     width: 80,
      //   },
      {
        title: "创建(流转)时间",
        dataIndex: "createTime",
        key: "createTime",
        width: 100,
        render: (text: string) => text?.slice(0, 19),
      },
      {
        title: "完成时间",
        dataIndex: "ljFinDate",
        key: "ljFinDate",
        width: 100,
      },

      {
        title: "热处理炉台",
        dataIndex: "heatTreatmentFurnacePlatforms",
        key: "heatTreatmentFurnacePlatforms",
        width: 60,
      },
      {
        title: "优先顺序",
        dataIndex: "priority",
        key: "priority",
        width: 60,
      },

      {
        title: "生产数量总量",
        dataIndex: "newsupcount",
        key: "newsupcount",
        width: 80,
        // render: (text, record) => {
        //   const isKg = kgArr.indexOf(record?.unit) !== -1;
        //   return isKg ? record?.productionKg : record?.productionPcs;
        // },
      },
      {
        title: "流转数量累积",
        dataIndex: "transferNumber",
        key: "transferNumber",
        // render: sumTransferNumberRender,
        width: 80,
      },
      {
        title: "流转桶数",
        dataIndex: "barrelageNumebr",
        key: "barrelageNumebr",
        width: 60,
        // render: (barrelCount: any) => {
        //   return barrelCount?.countBarrel;
        // },
      },
      {
        title: "单桶流转数量",
        dataIndex: "singleBarrelageNumebr",
        key: "singleBarrelageNumebr",
        width: 60,
      },
      {
        title: "当前工艺",
        dataIndex: "currentProcess",
        key: "currentProcess",
        width: 60,
        fixed: "right",
      },
      {
        title: "完工状态",
        dataIndex: "finishStatus",
        key: "finishStatus",
        width: 80,
        fixed: "right",
        render: (text: string) => {
          if (text === "完工") {
            return <Tag color="green">完工</Tag>;
          }
          return <Tag color="red">未完工</Tag>;
        },
      },
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
                onClick={() => {
                  setIssueModalOpen(true);
                  setIssueID({ transferCardCode: record?.transferCardCode });
                }}
              >
                编辑
              </Button>
            </>
          );
        },
        width: 80,
        fixed: "right",
      },
    ],
  };
};

export { formConfig, tableConfig };
