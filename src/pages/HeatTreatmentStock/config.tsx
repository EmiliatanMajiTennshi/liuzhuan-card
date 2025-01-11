import { exportHeatTreatExcel } from "@/api";
import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { CustomInput } from "@/components/CustomInput";
import { ExportOutlined } from "@ant-design/icons";
import { downloadFile, formatTime, message } from "@/utils";
import { LoadingBtn } from "@/components/LoadingBtn";

const formConfig: (props?: any) => IFormConfig = ({ form }) => {
  return {
    span: 8,
    formExtend: true,
    extraButtons: () => {
      return [
        <LoadingBtn
          asyncClick={async () => {
            await exportHeatTreatExcel().then((res: any) => {
              downloadFile(res?.data, `热处理库存_${formatTime()}.xlsx`);
            });
            message.success("导出成功！");
          }}
          icon={<ExportOutlined />}
        >
          导出
        </LoadingBtn>,
      ];
    },
    formItems: () => {
      return [
        {
          key: "spec",
          name: "规格",
          children: <CustomInput allowScanner></CustomInput>,
          rules: [],
        },
        {
          key: "itmid",
          name: "料号",
          children: <CustomInput allowScanner></CustomInput>,
          rules: [],
        },
      ];
    },
    handleDate: true,
  };
};

const tableConfig: (props: ITableConfigProps) => ITableConfig = (props) => {
  return {
    rowKey: "id", // 唯一标识
    api: "queryHeatTreatDashBoard",

    columns: [
      // {
      //   title: "流转卡编号",
      //   dataIndex: "transferCardCode",
      //   key: "transferCardCode",
      //   width: 160,
      // },
      // {
      //   title: "生产订单条码",
      //   dataIndex: "orderid",
      //   key: "orderid",
      //   width: 130,
      // },

      {
        title: "入库料号",
        dataIndex: "itmid",
        key: "itmid",
        width: 110,
      },

      {
        title: "品名",
        dataIndex: "name",
        key: "name",
        width: 90,
      },
      {
        title: "规格",
        dataIndex: "spec",
        key: "spec",
        width: 100,
      },
      {
        title: "材质",
        dataIndex: "itmtdid",
        key: "itmtdid",
        width: 80,
      },
      {
        title: "图号",
        dataIndex: "drawNumber",
        key: "drawNumber",
        width: 120,
      },

      //     title: "入库料号",
      //     dataIndex: "storePartNumber",
      //     key: "storePartNumber",
      //     width: 130,
      //   },

      {
        title: "数量",
        dataIndex: "transferNumber",
        key: "transferNumber",
        width: 100,
      },
      {
        title: "单位",
        dataIndex: "unit",
        key: "unit",
        width: 60,
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
