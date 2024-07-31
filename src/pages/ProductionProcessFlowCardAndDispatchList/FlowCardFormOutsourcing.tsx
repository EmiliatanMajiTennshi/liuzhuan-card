import {
  EditAbleInput,
  ReadOnlyInput,
  RenderQRCode,
  transFormToKg,
  transFormToPcs,
} from "@/utils";
import { FormInstance } from "antd";
import { IData } from "./indexType";

import styles from "./index.module.scss";
import { useEffect } from "react";
// import { getHeatTreatmentFurnacePlatformsList } from "@/api";

interface IProps {
  data: IData;
  isKg: boolean;
  form: FormInstance<any>;
}
const FlowCardFormOutsourcing = (props: IProps) => {
  const { data, isKg, form } = props;

  // // 最大流转数量
  // const [liuMaxKg, setLiuMaxKg] = useState(0);
  // const [liuMaxPCS, setLiuMaxPCS] = useState(0);

  // const isFinished = data?.partNumber?.substring(0, 2) === FINISHED_CODE;

  useEffect(() => {
    // 二维码不手动设置值会出现奇怪的bug
    form.setFieldValue("orderQRcode", data.barCode);
    form.setFieldValue("traceabilityNumberQRcode", data.traceabilityNumber);
    form.setFieldValue("rukuQRcode", data.partNumber);
    form.setFieldValue("lingliaoQRcode", data.materialPartNumber);
    form.setFieldValue(
      "huancount",
      data?.newsupcount && data?.parseWeight
        ? isKg
          ? transFormToPcs(data?.newsupcount, data?.parseWeight)
          : transFormToKg(data?.newsupcount, data?.parseWeight)
        : ""
    );
    form.setFieldValue("transferCardCode", data?.transferCard);

    // // 给流转数量初始值 产量-已使用
    // if (isKg) {
    //   if (data?.productionKg) {
    //     // 流转数量
    //     const transferKg = (
    //       parseFloat(data?.productionKg) -
    //       parseFloat(data?.alreadySend?.alreaySendNumKG || "0")
    //     ).toFixed(2);

    //     setLiuMaxKg(parseFloat(transferKg));
    //   }
    // } else {
    //   if (data?.productionPcs) {
    //     const transferPcs = (
    //       parseFloat(data?.productionPcs) -
    //       parseFloat(data?.alreadySend?.alreaySendNumPCS || "0")
    //     ).toFixed(2);

    //     setLiuMaxPCS(parseFloat(transferPcs));
    //   }
    // }
  }, [data]);
  useEffect(() => {
    // if(isKg){
    //     form
    // }
  }, [data]);
  return (
    <tbody>
      <tr>
        <ReadOnlyInput
          title="生产订单条码"
          name="barCode"
          titleStyle={{ color: "red" }}
        />
        <ReadOnlyInput title="料号" name="partNumber" />
        <ReadOnlyInput title="品名" name="name" />
        <ReadOnlyInput title="规格" name="specs" />
      </tr>
      <tr>
        <ReadOnlyInput title="材质" name="material" />
        <ReadOnlyInput
          title="商标"
          name="trademark"
          // options={
          //   data?.trademarkList?.map((item) => ({
          //     value: item.trademark,
          //     label: item.trademark,
          //   })) || []
          // }
          // placeholder="请选择商标"
        />
        <ReadOnlyInput
          title={isKg ? "生产数量(KG)" : "生产数量(PCS)"}
          name={isKg ? "productionKg" : "productionPcs"}
        />
        <ReadOnlyInput
          title={isKg ? "流转数量(KG)" : "流转数量(PCS)"}
          name={isKg ? "transferKg" : "transferPcs"}
          // max={liuMaxPCS}
          // step={0.01}
        />
      </tr>
      <tr>
        <EditAbleInput
          title="供方"
          name="supplierName"
          titleStyle={{ color: "red" }}
        />

        <ReadOnlyInput title="图号" name="drawingNumber" />
        <ReadOnlyInput title="追溯单号" name="traceabilityNumber" />
        <ReadOnlyInput title="完成日期" name="finishTime" />
      </tr>

      <tr>
        <EditAbleInput
          title="炉批号"
          name="furnaceNo"
          titleStyle={{ color: "red" }}
          colSpan={2}
        />
        <ReadOnlyInput title="行号" name="lineNumber" />
        <th colSpan={3} style={{ textAlign: "center" }}>
          生产入库扫描条码
        </th>
      </tr>
      <tr>
        <th rowSpan={3} style={{ color: "red" }}>
          主要尺寸
        </th>
        <ReadOnlyInput title={data?.project1Name || ""} name="project1Item" />
        <ReadOnlyInput title={data?.project2Name || ""} name="project1Item" />

        <td rowSpan={3} colSpan={3}>
          <div className={styles.QRcodes}>
            <RenderQRCode
              title="订单号"
              name="orderQRcode"
              rowSpan={3}
              value={data?.barCode || "没有数据"}
              noTd
            />
            <RenderQRCode
              title="追溯单号"
              name="traceabilityNumberQRCode"
              rowSpan={3}
              value={data?.traceabilityNumber || "没有数据"}
              noTd
            />
            <RenderQRCode
              title="入库二维码"
              name="rukuQRcode"
              rowSpan={3}
              value={data.partNumber || "没有数据"}
              noTd
            />
          </div>
        </td>
      </tr>
      <tr>
        <ReadOnlyInput title={data?.project3Name || ""} name="project3Item" />
        <ReadOnlyInput title={data?.project4Name || ""} name="project4Item" />
      </tr>
      <tr>
        <ReadOnlyInput title={data?.project5Name || ""} name="project5Item" />
        <ReadOnlyInput title={data?.project6Name || ""} name="project6Item" />
      </tr>
    </tbody>
  );
};
export default FlowCardFormOutsourcing;
