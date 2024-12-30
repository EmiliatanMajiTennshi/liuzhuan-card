import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import {
  Button,
  ConfigProvider,
  DatePicker,
  Modal,
  Popconfirm,
  Select,
  Tag,
} from "antd";
import { RuleObject } from "antd/es/form";

import { formatDate, message, RenderQRCode } from "@/utils";
import {
  getHeatTreatmentFurnacePlatformsList,
  updatePrintTransferCard,
} from "@/api";
import { DEFAULT_ORANGE, SUCCESS_CODE, ERROR_MESSAGE } from "@/constants";
import dayjs from "dayjs";
import { allowRecoverPrintState } from "@/constants/config";
import { SelectHeatTreatmentFurnacePlatform } from "@/components/SelectHeatTreatmentFurnacePlatform";
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
const formConfig: (props?: any) => IFormConfig = ({ form }) => {
  return {
    formExtend: true,
    formItems: () => {
      return [
        // {
        //   key: "barCode",
        //   name: "生产订单条码",
        //   children: <CustomInput></CustomInput>,
        //   rules: [],
        // },
        // {
        //   key: "partNumber",
        //   name: "料号",
        //   children: <CustomInput></CustomInput>,
        //   rules: [],
        // },

        // {
        //   key: "specs",
        //   name: "规格",
        //   children: <CustomInput></CustomInput>,
        //   rules: [],
        // },
        // {
        //   key: "transferCardCode",
        //   name: "流转卡编号",
        //   children: <CustomInput></CustomInput>,
        //   rules: [],
        // },

        // {
        //   key: "name",
        //   name: "品名",
        //   children: <CustomInput></CustomInput>,
        //   rules: [],
        // },

        {
          key: "transferTimeStart",
          name: "流转时间开始",
          children: (
            <DatePicker
              style={{ width: "100%" }}
              onChange={() => {
                if (form) {
                  form?.validateFields(["transferTimeEnd"]);
                }
              }}
            ></DatePicker>
          ),
          rules: [
            (form: any) => {
              const transferTimeStart = form.getFieldValue("transferTimeStart");
              const transferTimeEnd = form.getFieldValue("transferTimeEnd");

              if (
                transferTimeEnd &&
                transferTimeStart &&
                transferTimeEnd < transferTimeStart
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
          key: "transferTimeEnd",
          name: "流转时间结束",
          children: (
            <DatePicker
              style={{ width: "100%" }}
              onChange={() => {
                if (form) {
                  form?.validateFields(["transferTimeStart"]);
                }
              }}
            ></DatePicker>
          ),
          rules: [
            (form: any) => {
              const transferTimeStart = form.getFieldValue("transferTimeStart");
              const transferTimeEnd = form.getFieldValue("transferTimeEnd");

              if (
                transferTimeEnd &&
                transferTimeStart &&
                transferTimeEnd < transferTimeStart
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
          children: <SelectHeatTreatmentFurnacePlatform />,
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
    initValues: {
      transferTimeStart: dayjs(),
      transferTimeEnd: dayjs(),
      finishStatus: "未完工",
    },
  };
};

const tableConfig: (props: ITableConfigProps) => ITableConfig = (props) => {
  const { setIssueModalOpen, setIssueID, setPrintModalOpen, setRefreshFlag } =
    props;
  return {
    name: "HeatTreatmentFurnaceOperationQuery",
    rowKey: "id", // 唯一标识
    api: "queryTransferCardNew",
    defaultParam: {
      heatTreatmentFurnacePlatformsStatus: "1",
      transferTimeStart: formatDate(),
      transferTimeEnd: formatDate(),
      finishStatus: "未完工",
    },
    noPaging: true,
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
        width: 100,
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
        width: 160,
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
        width: 100,
      },
      {
        title: "追溯条码",
        dataIndex: "traceabilityNumber",
        key: "traceabilityNumber",
        width: 80,
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
        width: 100,
      },
      {
        title: "图号",
        dataIndex: "itmTEID",
        key: "itmTEID ",
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
        width: 140,
        render: (text) => text?.slice(0, 10),
      },

      {
        title: "单位",
        dataIndex: "unit",
        key: "unit",
        width: 60,
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
        width: 80,
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
        width: 80,
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
        render: (text: string) => {
          if (text === "未完工") {
            return <Tag color="red">未完工</Tag>;
          }
          if (text === "完工") {
            return <Tag color="green">完工</Tag>;
          }
          return text;
        },
      },
      {
        title: "操作",
        dataIndex: "operate",
        key: "operate",
        fixed: "right",
        width: allowRecoverPrintState ? 210 : 160,
        render: (text, record) => {
          return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ display: "flex" }}>
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
              </span>
              {allowRecoverPrintState && (
                <Popconfirm
                  title="确认恢复"
                  description="你确定要恢复打印状态吗"
                  onConfirm={() => {
                    updatePrintTransferCard({
                      transferCardCode: record?.transferCardCode,
                    })
                      .then((res) => {
                        if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
                          message.success(res?.data?.data);
                          setRefreshFlag((flag) => !flag);
                        } else {
                          message.error(res?.data?.data);
                        }
                      })
                      .catch(() => {
                        message.error(ERROR_MESSAGE);
                      });
                  }}
                  onCancel={() => {}}
                  okText="确认"
                  cancelText="取消"
                >
                  <Button
                    type="link"
                    size="small"
                    style={{ marginLeft: 10 }}
                    disabled={record?.printStatus === "NO"}
                  >
                    恢复
                  </Button>
                </Popconfirm>
              )}
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
