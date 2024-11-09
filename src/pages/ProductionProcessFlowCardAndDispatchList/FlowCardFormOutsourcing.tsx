import {
  EditAbleInput,
  ReadOnlyInput,
  RenderQRCode,
  transformToKg,
  transFormToPcs,
} from "@/utils";
import { FormInstance } from "antd";
import { IData } from "./indexType";

import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { normalStyle, normalStyle18 } from "./styles";
// import { getHeatTreatmentFurnacePlatformsList } from "@/api";

interface IProps {
  data: IData;
  form: FormInstance<any>;
  isKg: boolean;
}
const FlowCardFormOutsourcing = (props: IProps) => {
  const { data, form, isKg } = props;
  // 最大流转数量
  const [liuMax, setLiuMax] = useState(0);

  useEffect(() => {
    setLiuMax(parseFloat(data?.productKg || ""));
  }, [data]);
  return (
    <tbody>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="生产订单条码"
          name="orderid"
          titleStyle={{ color: "red", ...normalStyle }}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="料号"
          name="itmid"
          titleStyle={normalStyle}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="品名"
          name="name"
          titleStyle={normalStyle}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="规格"
          name="spec"
          titleStyle={normalStyle}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="材质"
          name="itmtdid"
          titleStyle={normalStyle}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="商标"
          name="trademark"
          titleStyle={normalStyle}
          // options={
          //   data?.trademarkList?.map((item) => ({
          //     value: item.trademark,
          //     label: item.trademark,
          //   })) || []
          // }
          // placeholder="请选择商标"
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title={isKg ? "生产数量(KG)" : "生产数量(PCS)"}
          name={"productKg"}
          titleStyle={normalStyle}
        />
        <EditAbleInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title={isKg ? "流转数量(KG)" : "流转数量(PCS)"}
          name={"transferNumberKG"}
          titleStyle={normalStyle}
          max={liuMax}
          isNumber
          // step={0.01}
        />
      </tr>
      <tr>
        <EditAbleInput
          style={{ ...normalStyle18 }}
          title="供方"
          name="supplierName"
          titleStyle={{ color: "red", ...normalStyle }}
        />

        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="图号"
          name="itmTEID"
          titleStyle={normalStyle}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="追溯单号"
          name="traceabilityNumber"
          titleStyle={normalStyle}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="完成日期"
          name="ljFinDate"
          titleStyle={normalStyle}
        />
      </tr>

      <tr>
        <EditAbleInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="炉批号"
          name="furnaceNo"
          titleStyle={{ color: "red", ...normalStyle }}
          colSpan={2}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="行号"
          name="u9LineNo"
          titleStyle={normalStyle}
        />
        <th colSpan={3} style={{ textAlign: "center", ...normalStyle }}>
          生产入库扫描条码
        </th>
      </tr>
      <tr>
        <th rowSpan={3} style={{ color: "red", ...normalStyle }}>
          主要尺寸
        </th>
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title={data?.project1Name || ""}
          name="project1Item"
          titleStyle={normalStyle}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title={data?.project2Name || ""}
          name="project1Item"
          titleStyle={normalStyle}
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
              value={data.itmid || "没有数据"}
              form={form}
              noTd
            />
          </div>
        </td>
      </tr>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title={data?.project3Name || ""}
          name="project3Item"
          titleStyle={normalStyle}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title={data?.project4Name || ""}
          name="project4Item"
          titleStyle={normalStyle}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title={data?.project5Name || ""}
          name="project5Item"
          titleStyle={normalStyle}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title={data?.project6Name || ""}
          name="project6Item"
          titleStyle={normalStyle}
        />
      </tr>
    </tbody>
  );
};
export default FlowCardFormOutsourcing;
