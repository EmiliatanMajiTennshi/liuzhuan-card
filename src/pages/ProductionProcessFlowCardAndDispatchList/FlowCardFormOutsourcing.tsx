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
  form: FormInstance<any>;
}
const FlowCardFormOutsourcing = (props: IProps) => {
  const { data, form } = props;

  const isKg = data?.productKg || data?.transferNumberKG;

  return (
    <tbody>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="生产订单条码"
          name="orderid"
          titleStyle={{ color: "red" }}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="料号"
          name="itmid"
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="品名"
          name="name"
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="规格"
          name="spec"
        />
      </tr>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="材质"
          name="itmtdid"
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
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
          style={{ lineHeight: "24px" }}
          title={isKg ? "生产数量(KG)" : "生产数量(PCS)"}
          name={isKg ? "productKg" : "productPcs"}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title={isKg ? "流转数量(KG)" : "流转数量(PCS)"}
          name={isKg ? "transferNumberKG" : "transferNumberPCS"}
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

        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="图号"
          name="itmTEID"
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="追溯单号"
          name="traceabilityNumber"
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="完成日期"
          name="ljFinDate"
        />
      </tr>

      <tr>
        <EditAbleInput
          title="炉批号"
          name="furnaceNo"
          titleStyle={{ color: "red" }}
          colSpan={2}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="行号"
          name="u9LineNo"
        />
        <th colSpan={3} style={{ textAlign: "center" }}>
          生产入库扫描条码
        </th>
      </tr>
      <tr>
        <th rowSpan={3} style={{ color: "red" }}>
          主要尺寸
        </th>
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title={data?.project1Name || ""}
          name="project1Item"
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title={data?.project2Name || ""}
          name="project1Item"
        />

        <td rowSpan={3} colSpan={3}>
          <div className={styles.QRcodes}>
            <RenderQRCode
              title="订单号"
              name="orderQRcode"
              rowSpan={3}
              value={data?.orderid || "没有数据"}
              noTd
              form={form}
            />
            <RenderQRCode
              title="追溯单号"
              name="traceabilityNumberQRCode"
              rowSpan={3}
              value={data?.traceabilityNumber || "没有数据"}
              noTd
              form={form}
            />
            <RenderQRCode
              title="入库二维码"
              name="rukuQRcode"
              rowSpan={3}
              value={data.parseitmid || "没有数据"}
              form={form}
              noTd
            />
          </div>
        </td>
      </tr>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title={data?.project3Name || ""}
          name="project3Item"
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title={data?.project4Name || ""}
          name="project4Item"
        />
      </tr>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title={data?.project5Name || ""}
          name="project5Item"
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title={data?.project6Name || ""}
          name="project6Item"
        />
      </tr>
    </tbody>
  );
};
export default FlowCardFormOutsourcing;
