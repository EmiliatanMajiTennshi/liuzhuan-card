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
  message,
} from "antd";
import { RuleObject } from "antd/es/form";

import { formatDate, RenderQRCode } from "@/utils";
import {
  getHeatTreatmentFurnacePlatformsList,
  insertDeliveryNew,
  updateHeatTreatmentStatus,
} from "@/api";
import {
  ERROR_MESSAGE,
  kgArr,
  DEFAULT_ORANGE,
  SUCCESS_CODE,
} from "@/constants";
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
    width: 500,
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
                { value: "完成", label: "完成" },
                { value: "未完成", label: "未完成" },
              ]}
            ></Select>
          ),
          rules: [],
        },
      ];
    },
    handleDate: true,

    initValues: {
      heatTreatmentDelivery: "未完成",
      createTimeStart: dayjs(),
      createTimeEnd: dayjs(),
    },
  };
};

const tableConfig: (props: ITableConfigProps) => ITableConfig = (props) => {
  const { setRefreshFlag, setIssueModalOpen, setIssueID, setPrintModalOpen } =
    props;
  return {
    rowKey: "id", // 唯一标识
    api: "queryLogisticsNew",
    queryFlowCardApi: "clickTransferCard",
    flowCardType: "flowCard",
    noPaging: true,
    defaultParam: {
      heatTreatmentDelivery: "未完成",
      createTimeStart: formatDate(),
      createTimeEnd: formatDate(),
    },
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
        dataIndex: "barCode",
        key: "barCode",
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
                    barCode: record?.barCode,
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
        dataIndex: "partNumber",
        key: "partNumber",
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
        dataIndex: "production",
        key: "production",
        width: 110,
        // render: (text, record) => {
        //   const isKg = kgArr.indexOf(record?.unit) !== -1;
        //   return isKg ? record?.productionKg : record?.productionPcs;
        // },
      },
      {
        title: "流转数量累积",
        dataIndex: "transfer",
        key: "transfer",
        // render: sumTransferNumberRender,
        width: 120,
      },

      {
        title: "流转桶数",
        dataIndex: "barrelNumber",
        key: "barrelNumber",
        width: 100,
        // render: (barrelCount: any) => {
        //   return barrelCount?.countBarrel;
        // },
      },
      {
        title: "单桶数量",
        dataIndex: "singleBarrelNumber",
        key: "singleBarrelNumber",
        width: 110,
        // render: (text, record) => {
        //   const isKg = kgArr.indexOf(record?.unit) !== -1;
        //   return isKg ? record?.transferKg : record?.transferPcs;
        // },
      },
      {
        title: "配送状态",
        dataIndex: "heatTreatmentDelivery",
        key: "heatTreatmentDelivery",
        width: 80,
        fixed: "right",
        render: (text: string) => (
          <Tag color={text === "完成" ? "green" : "red"}>{text}</Tag>
        ),
      },
      {
        title: "操作",
        dataIndex: "operate",
        key: "operate",
        fixed: "right",
        width: 100,
        render: (text, record) => {
          console.log(record, 12411);

          return (
            <Button
              disabled={record?.heatTreatmentDelivery === "1"}
              type="primary"
              size="small"
              onClick={async () => {
                const {
                  transferCardCode,
                  barCode,
                  partNumber,
                  storePartNumber,
                } = record;
                const res = await insertDeliveryNew({
                  transferCardCode,
                  barCode,
                  partNumber,
                  storePartNumber,
                });
                if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
                  message.success(res?.data?.data);
                  setRefreshFlag((flag) => !flag);
                } else {
                  message.error(res?.response?.data?.msg || ERROR_MESSAGE);
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
