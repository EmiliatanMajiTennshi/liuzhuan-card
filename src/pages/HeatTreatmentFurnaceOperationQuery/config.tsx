import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import {
  Button,
  ConfigProvider,
  DatePicker,
  Input,
  Modal,
  Select,
  Tag,
} from "antd";
import { RuleObject } from "antd/es/form";

import { RenderQRCode } from "@/utils";
import { getHeatTreatmentFurnacePlatformsList } from "@/api";
import { kgArr, DEFAULT_ORANGE, SUCCESS_CODE } from "@/constants";
import { sumTransferNumberRender } from "@/utils/tableRender";
import dayjs from "dayjs";
interface IGetModalConfigProps {
  barCode: string;
  transferCardCode: string;
}
const getModalConfig = ({
  barCode,
  transferCardCode,
}: IGetModalConfigProps) => {
  return {
    title: "二维码",
    width: 600,
    closable: true,
    icon: null,
    content: (
      <div
        style={{ margin: 20, display: "flex", justifyContent: "space-between" }}
      >
        <RenderQRCode
          size={100}
          noTd
          name="barCode"
          value={barCode}
          footer={
            <span>
              订单号：<div>{barCode}</div>
            </span>
          }
          notInForm
        />
        <RenderQRCode
          size={100}
          noTd
          name="transferCardCode"
          value={transferCardCode}
          footer={
            <>
              流转卡编号：<div>{transferCardCode}</div>
            </>
          }
          notInForm
        />
      </div>
    ),
  };
};
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
        // {
        //   key: "barCode",
        //   name: "生产订单条码",
        //   children: <Input></Input>,
        //   rules: [],
        // },
        // {
        //   key: "partNumber",
        //   name: "料号",
        //   children: <Input></Input>,
        //   rules: [],
        // },

        // {
        //   key: "specs",
        //   name: "规格",
        //   children: <Input></Input>,
        //   rules: [],
        // },
        // {
        //   key: "transferCardCode",
        //   name: "流转卡编号",
        //   children: <Input></Input>,
        //   rules: [],
        // },

        // {
        //   key: "name",
        //   name: "品名",
        //   children: <Input></Input>,
        //   rules: [],
        // },

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
          name: "创建时间开始",
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
          key: "finishStatus",
          name: "完工状态",
          children: (
            <Select
              allowClear
              options={[
                { value: "完工", label: "完工" },
                { value: "未完工", label: "未完工" },
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
  const { setRefreshFlag, setIssueModalOpen, setIssueID, setPrintModalOpen } =
    props;
  return {
    name: "HeatTreatmentFurnaceOperationQuery",
    rowKey: "id", // 唯一标识
    api: "queryTransferCardNew",
    defaultParam: {
      heatTreatmentFurnacePlatformsStatus: "1",

      createTimeStart: dayjs().format("YYYY-MM-DD"),
      createTimeEnd: dayjs().format("YYYY-MM-DD"),
    },

    queryFlowCardApi: "queryTransferCardInfoByCardIdNew",
    flowCardType: "flowCard",
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
        dataIndex: "heatTreatmentFurnacePlatforms",
        key: "heatTreatmentFurnacePlatforms",
        width: 150,
        render: (text) => {
          return (
            <span
              style={{
                fontWeight: "bold",
                color: DEFAULT_ORANGE,
                fontSize: 16,
              }}
            >
              {text}
            </span>
          );
        },
      },
      {
        title: "流转卡编号",
        dataIndex: "transferCardCode",
        key: "transferCardCode",
        width: 260,
      },
      {
        title: "生产订单条码",
        dataIndex: "orderid",
        key: "orderid",
        width: 180,
        render: (text, record) => {
          return (
            <Button
              type="primary"
              size="small"
              style={{ fontWeight: "bold" }}
              onClick={() => {
                Modal.info(
                  getModalConfig({
                    barCode: record?.orderid,
                    transferCardCode: record?.transferCardCode,
                  })
                );
              }}
            >
              {text}
            </Button>
          );
        },
      },

      {
        title: "入库料号",
        dataIndex: "itmid",
        key: "itmid",
        width: 180,
      },
      {
        title: "追溯条码",
        dataIndex: "traceabilityNumber",
        key: "traceabilityNumber",
        width: 130,
      },
      {
        title: "品名",
        dataIndex: "name",
        key: "name",
        width: 120,
      },
      {
        title: "规格",
        dataIndex: "spec",
        key: "spec",
        width: 100,
      },

      // {
      //   title: "表面处理",
      //   dataIndex: "surfaceTreatment",
      //   key: "surfaceTreatment",
      //   width: 100,
      // },

      //     title: "入库料号",
      //     dataIndex: "storePartNumber",
      //     key: "storePartNumber",
      //     width: 130,
      //   },
      // {
      //   title: "字样",
      //   dataIndex: "trademark",
      //   key: "trademark",
      //   width: 150,
      // },
      {
        title: "创建（流转）时间",
        dataIndex: "createTime",
        key: "createTime",
        width: 160,
        render: (text) => text?.slice(0, 19),
      },

      {
        title: "单位",
        dataIndex: "unit",
        key: "unit",
        width: 100,
      },
      {
        title: "生产数量总量",
        dataIndex: "newsupcount",
        key: "newsupcount",
        width: 110,
      },
      {
        title: "材质",
        dataIndex: "material",
        key: "material",
        width: 100,
      },
      {
        title: "流转数量累积",
        dataIndex: "transferNumber",
        key: "transferNumber",

        width: 120,
      },

      {
        title: "流转桶数",
        dataIndex: "barrelageNumebr",
        key: "barrelageNumebr",
        width: 120,
      },
      {
        title: "单桶数量",
        dataIndex: "singleBarrelageNumebr",
        key: "singleBarrelageNumebr",
        width: 110,
      },
      {
        title: "配送状态",
        dataIndex: "finishStatus",
        key: "finishStatus",
        width: 80,
        fixed: "right",
        // render: (text: string) => {
        //   if (text === "0") {
        //     return <Tag color="red">未完成</Tag>;
        //   }
        //   if (text === "1") {
        //     return <Tag color="green">完成</Tag>;
        //   }
        //   return text;
        // },
      },
      {
        title: "操作",
        dataIndex: "operate",
        key: "operate",
        fixed: "right",
        width: 190,
        render: (text, record) => {
          return (
            <div style={{ display: "flex" }}>
              <Button
                type="primary"
                size="small"
                style={{ marginLeft: 10 }}
                onClick={() => {
                  setIssueModalOpen(true);
                  setIssueID({
                    transferCardCode: record?.transferCardCode,
                  });
                }}
              >
                查看
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
                    setIssueID({
                      transferCardCode: record?.transferCardCode,
                    });
                  }}
                  disabled={record?.printStatus !== "NO"}
                >
                  {record?.printStatus !== "NO" ? "已打印" : "打印"}
                </Button>
              </ConfigProvider>
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
