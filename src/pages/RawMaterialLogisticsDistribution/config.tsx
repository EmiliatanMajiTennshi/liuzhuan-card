import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { Button, DatePicker, Input, Modal, Select, Tag } from "antd";
import { RuleObject } from "antd/es/form";

import { formatDate, message, RenderQRCode } from "@/utils";
import {
  getHeatTreatmentFurnacePlatformsList,
  insertDeliveryNew,
  updatePfStatus,
} from "@/api";
import { ERROR_MESSAGE, DEFAULT_ORANGE, SUCCESS_CODE } from "@/constants";
import dayjs from "dayjs";
import { SelectHeatTreatmentFurnacePlatform } from "@/components/SelectHeatTreatmentFurnacePlatform";
import { CustomInput } from "@/components/CustomInput";

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
const formConfig: (props?: any) => IFormConfig = ({ form }) => {
  return {
    formExtend: true,
    formItems: () => {
      return [
        {
          key: "customFields1",
          name: "料号",
          children: <CustomInput></CustomInput>,
          rules: [],
        },

        {
          key: "customFields2",
          name: "规格",
          children: <CustomInput></CustomInput>,
          rules: [],
        },

        {
          key: "goodsName",
          name: "品名",
          children: <CustomInput></CustomInput>,
          rules: [],
        },

        {
          key: "status",
          name: "配送状态",
          children: (
            <Select
              allowClear
              options={[{ value: "已派发" }, { value: "未派发" }]}
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
  const { setRefreshFlag } = props;
  return {
    rowKey: "id", // 唯一标识
    api: "queryPfInfostatus",
    queryFlowCardApi: "clickTransferCard",
    flowCardType: "flowCard",
    noPaging: true,
    defaultParam: {
      heatTreatmentDelivery: "未完成",
      createTimeStart: formatDate(),
      createTimeEnd: formatDate(),
    },
    columns: [
      {
        title: "入库料号",
        dataIndex: "customFields1",
        key: "customFields1",
        width: 120,
      },

      {
        title: "品名",
        dataIndex: "goodsName",
        key: "goodsName",
        width: 120,
      },
      {
        title: "规格",
        dataIndex: "customFields2",
        key: "customFields2",
        width: 100,
      },
      {
        title: "材质",
        dataIndex: "customFields3",
        key: "customFields3",
        width: 100,
      },
      {
        title: "库名",
        dataIndex: "house_name",
        key: "house_name",
        width: 140,
      },
      {
        title: "派发数量",
        dataIndex: "pfcount",
        key: "pfcount",
        width: 80,
      },
      {
        title: "单位",
        dataIndex: "uname",
        key: "uname",
        width: 50,
      },
      {
        title: "下发派发时间",
        dataIndex: "createTime",
        key: "createTime",
        width: 140,
        render: (text) => text?.slice(0, 19),
      },
      {
        title: "派发时间",
        dataIndex: "pftime",
        key: "pftime",
        width: 140,
        render: (text) => text?.slice(0, 19),
      },
      {
        title: "派发状态",
        dataIndex: "status",
        key: "status",
        width: 60,
        render: (text: string) => {
          if (text === "未派发") {
            return <Tag color="red">未派发</Tag>;
          }
          if (text === "已派发") {
            return <Tag color="green">已派发</Tag>;
          }
          return "-";
        },
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
              disabled={record?.status === "已派发"}
              type="primary"
              size="small"
              onClick={async () => {
                const { goodsId } = record;
                const res = await updatePfStatus({
                  goodsId,
                });
                if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
                  message.success(res?.data?.data);
                  setRefreshFlag((flag) => !flag);
                } else {
                  message.error(res?.response?.data?.msg || ERROR_MESSAGE);
                }
              }}
            >
              派发
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
