import { insertRawMaterial } from "@/api";
import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { CustomInput } from "@/components/CustomInput";
import { SUCCESS_CODE } from "@/constants";
import { UPDATE_FAILED, UPDATE_SUCCESS } from "@/constants/constants";
import { formatTime, message } from "@/utils";
import { Button, DatePicker, Input, InputNumber } from "antd";
import dayjs from "dayjs";

const formConfig: (props?: any) => IFormConfig = ({ form, navigate }) => {
  return {
    formExtend: true,

    formItems: [
      {
        key: "customFields1",
        name: "零件料号",
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
        key: "customFields2",
        name: "规格",
        children: <CustomInput></CustomInput>,
        rules: [],
      },
    ],
  };
};

const tableConfig: (props: ITableConfigProps) => ITableConfig = (props) => {
  const { setRefreshFlag } = props;
  return {
    rowKey: "id", // 唯一标识
    api: "queryPfInfo",

    columns: [
      {
        title: "零件料号",
        dataIndex: "customFields1",
        key: "customFields1",
        width: 130,
      },

      {
        title: "品名",
        dataIndex: "goodsName",
        key: "goodsName",
        width: 150,
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
        title: "单位",
        dataIndex: "uname",
        key: "uname",
        width: 100,
      },
      {
        title: "库存",
        dataIndex: "count",
        key: "count",
        width: 100,
      },
      {
        title: "预计库存",
        dataIndex: "remainingCount",
        key: "remainingCount",
        width: 100,
      },
      {
        title: "派发数量",
        dataIndex: "pfcount",
        key: "pfcount",
        width: 100,
        render: (text, record) => {
          return (
            <InputNumber
              defaultValue={text}
              onChange={(e) => {
                console.log(e, 1214);
                record.pfcount = e;
              }}
            />
          );
        },
      },
      {
        title: "派发时间",
        dataIndex: "pftime",
        key: "pftime",
        width: 160,
        fixed: "right",
        render: (text, record) => (
          <DatePicker
            showTime
            style={{ width: "100%" }}
            placeholder="请选择派发时间"
            onChange={(e) => {
              console.log(e, 1214);
              record.pftime = e ? formatTime(e) : "";
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
                insertRawMaterial({
                  pfcount: record?.pfcount,
                  pftime: record?.pftime,
                  goodsId: record?.goodsId,
                }).then((res) => {
                  if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
                    message.success(`${res?.data?.data || UPDATE_SUCCESS}`);
                    setRefreshFlag((flag) => !flag);
                  } else {
                    message.error(`${res?.data?.data || UPDATE_FAILED}`);
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
    ],
  };
};

export { formConfig, tableConfig };
