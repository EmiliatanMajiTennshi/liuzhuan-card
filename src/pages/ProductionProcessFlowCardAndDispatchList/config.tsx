import { ITableConfig } from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { IData } from "./indexType";

export const getTableColumns = ({
  flowCardType,
}: {
  flowCardType: ITableConfig["flowCardType"];
}) => {
  const columns = {
    common: [
      {
        title: "工序",
        dataIndex: "processName",
        key: "processName",
      },

      {
        title: "检验等级",
        dataIndex: "orderid",
        key: "orderid",
      },
      {
        title: "检验员条码",
        dataIndex: "itmid",
        key: "itmid",
      },
      {
        title: "检验员",
        dataIndex: "goodsname",
        key: "goodsname",
      },
      {
        title: "操作工条码",
        dataIndex: "format",
        key: "format",
      },
      {
        title: "操作工",
        dataIndex: "Pcode",
        key: "Pcode",
      },
      {
        title: "完成日期",
        dataIndex: "ljFinDate",
        key: "ljFinDate",
      },
      {
        title: "设备条码",
        dataIndex: "uomname",
        key: "uomname",
      },
      {
        title: "设备名称",
        dataIndex: "supcount",
        key: "supcount",
      },
      {
        title: "产量",
        dataIndex: "sumcount",
        key: "sumcount",
      },
    ],
    outsourcing: [
      {
        title: "工序",
        dataIndex: "processName",
        key: "processName",
      },

      {
        title: "检验等级",
        dataIndex: "orderid",
        key: "orderid",
      },
      {
        title: "检验员条码",
        dataIndex: "itmid",
        key: "itmid",
      },
      {
        title: "检验员",
        dataIndex: "goodsname",
        key: "goodsname",
      },
      {
        title: "操作工条码",
        dataIndex: "format",
        key: "format",
      },
      {
        title: "操作工",
        dataIndex: "Pcode",
        key: "Pcode",
      },
      {
        title: "完成日期",
        dataIndex: "ljFinDate",
        key: "ljFinDate",
      },
      {
        title: "设备条码",
        dataIndex: "uomname",
        key: "uomname",
      },
      {
        title: "设备名称",
        dataIndex: "supcount",
        key: "supcount",
      },
      {
        title: "产量",
        dataIndex: "sumcount",
        key: "sumcount",
      },
    ],
  };
  return columns[flowCardType || "common"];
};

interface IGetParams {
  data: IData;
  values: any;
  mainsize: any;
  isKg: boolean;
  flowCardType: ITableConfig["flowCardType"];
}
export const getParams = ({
  data,
  values,
  mainsize,
  isKg,
  flowCardType,
}: IGetParams) => {
  const params = {
    common: {
      //零件类型
      type: data?.type,
      //生产订单条码
      barCode: values?.orderQRcode,
      //零件料号
      partNumber: values?.itmid,
      // //入库料号
      // storePartNumber: "",
      //品名
      name: values?.name,
      //规格
      specs: values?.spec,
      //完成时间
      finishTime: values?.ljFinDate,
      //单位
      unit: data?.unit,
      //材质
      material: values?.itmtdid,
      //表面处理
      surfaceTreatment: values?.itmtcid,
      //流转卡编号
      transferCardCode: data?.transferCardCode,
      //追溯单号
      traceabilityNumber: values?.traceabilityNumber,
      //客户订单号
      customerOrderNo: values?.ordernum,
      //图号
      drawingNumber: values?.itmTEID,
      //生产公斤数
      productionKg: isKg ? values?.newsupcount : values?.huancount,
      //流转公斤数
      transferKg: isKg ? values?.liucount : values?.liuhuancount,
      //生产PCS数
      productionPcs: !isKg ? values?.newsupcount : values?.huancount,
      //流转PCS数
      transferPcs: !isKg ? values?.liucount : values?.liuhuancount,
      //供方/炉批号
      furnaceNo: values.furnaceNum,
      //材料料号
      materialPartNumber: values.mItmID,
      //材料品名
      materialName: values.mName,
      //材料规格
      materialSpec: values.mspec,
      //材料材质
      materialQuality: values.mItmTDID,
      //主要尺寸名字1
      project1Name: mainsize.project1,
      //主要尺寸名字1内容
      project1Item: mainsize.projectitem1,
      //主要尺寸名字2
      project2Name: mainsize.project2,
      //主要尺寸名字2内容
      project2Item: mainsize.projectitem2,
      //主要尺寸名字3
      project3Name: mainsize.project3,
      //主要尺寸名字3内容
      project3Item: mainsize.projectitem3,
      //主要尺寸名字4
      project4Name: mainsize.project4,
      //主要尺寸名字4内容
      project4Item: mainsize.projectitem4,
      //主要尺寸名字5
      project5Name: mainsize.project5,
      //主要尺寸名字5内容
      project5Item: mainsize.projectitem5,
      //商标
      trademark: values.trademark,
      //追溯单号(半品)
      orderCatchHalf: values.orderCatchHalf,
      //热处理炉台
      heatTreatmentFurnacePlatform: values.heatTreatmentFurnace,
      //优先顺序
      priorityOrder: values.priority,
      //零件流转时间
      tranferTime: values.transferTime,
      //工艺
      process: data?.processList,
    },
    outsourcing: {
      //零件类型
      type: data?.type,
      //生产订单条码
      barCode: values?.orderQRcode,
      //零件料号
      partNumber: values?.itmid,
      // //入库料号
      // storePartNumber: "",
      //品名
      name: values?.name,
      //规格
      specs: values?.spec,
      //完成时间
      finishTime: values?.ljFinDate,
      //单位
      unit: data?.unit,
      //材质
      material: values?.itmtdid,
      //流转卡编号
      transferCardCode: data?.transferCardCode,
      //追溯单号
      traceabilityNumber: values?.traceabilityNumber,
      //图号
      drawingNumber: values?.itmTEID,
      //生产公斤数
      productionKg: isKg ? values?.newsupcount : values?.huancount,
      //流转公斤数
      transferKg: (isKg ? values?.liucount : values?.liuhuancount).toString(),
      //生产PCS数
      productionPcs: !isKg ? values?.newsupcount : values?.huancount,
      //流转PCS数
      transferPcs: (!isKg ? values?.liucount : values?.liuhuancount).toString(),
      //主要尺寸名字1
      project1Name: mainsize.project1,
      //主要尺寸名字1内容
      project1Item: mainsize.projectitem1,
      //主要尺寸名字2
      project2Name: mainsize.project2,
      //主要尺寸名字2内容
      project2Item: mainsize.projectitem2,
      //主要尺寸名字3
      project3Name: mainsize.project3,
      //主要尺寸名字3内容
      project3Item: mainsize.projectitem3,
      //主要尺寸名字4
      project4Name: mainsize.project4,
      //主要尺寸名字4内容
      project4Item: mainsize.projectitem4,
      //主要尺寸名字5
      project5Name: mainsize.project5,
      //主要尺寸名字5内容
      project5Item: mainsize.projectitem5,
      //商标
      trademark: values.trademark,
      //工艺
      process: data?.processList,
      //行号
      U9LineNo: values?.U9LineNo,
    },
  };
  return params[flowCardType || "common"];
};
