import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { Button, DatePicker, Select, Tag } from "antd";
import { formatDate, message } from "@/utils";
import { updatePfStatus } from "@/api";
import { ERROR_MESSAGE, SUCCESS_CODE } from "@/constants";
import dayjs from "dayjs";
import { CustomInput } from "@/components/CustomInput";

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
        {
          key: "pftime",
          name: "配发时间",
          children: <DatePicker style={{ width: "100%" }}></DatePicker>,
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
    api: "queryPfInfostatus",
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
                const { goodsId, pftime } = record;
                const res = await updatePfStatus({
                  goodsId,
                  pftime,
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
